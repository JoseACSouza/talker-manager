const express = require('express');
const fs = require('fs').promises;
const { validateTalkerInfo, validateTalk } = require('./middlewares/validateTalker');
const { validateToken } = require('./middlewares/validateToken');
const randomToken = require('crypto');

const readFile = async () => {
  try {
    const data = await fs.readFile('src/talker.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Arquivo não pôde ser lido: ${error}`);
  }
};

const writeFile = async ( newText ) => {
  try {
    await fs.writeFile("src/talker.json", JSON.stringify(newText));

  } catch (error) {
    console.error(`Arquivo não pôde ser escrito: ${error}`);
  }
};

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

const authLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    res.status(400).send({
      message: 'O campo "email" é obrigatório',
    });
  } else if (!password) {
    res.status(400).send({
      message: 'O campo "password" é obrigatório',
    });
  } else next();
};

const authLogin2 = (req, res, next) => {
  const { email, password } = req.body;
  const emailValidate = !(email.includes('@') && email.includes('.com') && email.length > 5);
  if (emailValidate) {
    res.status(400).send({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  } else if (password.length < 6) {
    res.status(400).send({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  } else next(); 
};

// não remova esse endpoint, e para o avaliador funcionar 
  app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
  });

// endpoint get /talker 

  app.get('/talker', async (req, res) => {
  try {
    const talker = await readFile();
  res.status(200).send(talker);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
  });

// endpoint get /talker/:id
app.get('/talker/:id', async (req, res) => {
  try {
    const talker = await readFile();
    if (talker.find((talkerID) => talkerID.id === +req.params.id)) {
      res.status(200).send(talker.find((talkerID) => talkerID.id === +req.params.id));
    } else res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// endpoint post /login
app.post('/login', authLogin, authLogin2, (req, res) => {
  res.status(200).send({
    token: randomToken.randomBytes(8).toString('hex'),
  });
});

app.post('/talker', validateToken, validateTalkerInfo, validateTalk, async (req, res) => {
  const data = await readFile();
  const maiorValor = Math.max(...data.map((item) => item.id));
  const newBody =  {
      name: req.body.name,
      age: req.body.age,
      id: maiorValor + 1,
      talk: req.body.talk,
    };
  const newData = [...data, newBody];
  writeFile(newData);
  res.status(201).json(newBody);
});

app.listen(PORT, () => {
  console.log('Online');
});
