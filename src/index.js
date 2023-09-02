const express = require('express');
const fs = require('fs').promises;
// const path = require('path');  
const randomToken = require('crypto');

const readFile = async () => {
  try {
    const data = await fs.readFile('src/talker.json');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Arquivo não pôde ser lido: ${error}`);
  }
};

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

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
app.post('/login', (req, res) => {
  // const { email, password } = req.body;
  res.status(200).send({
    token: randomToken.randomBytes(8).toString('hex'),
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
