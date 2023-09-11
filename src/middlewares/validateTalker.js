function validateTalkerInfo (req, res, next) {
  const { name, age } = req.body;
  const validateAge =  Number.isInteger(age) && age >= 18;
  if (!name) {
    res.status(400).send({
      message: 'O campo "name" é obrigatório'
    });
  } else if (name.length < 3) {
    res.status(400).send({
      message: 'O "name" deve ter pelo menos 3 caracteres'
    });
  } else if (!age) {
    res.status(400).send({
      message: 'O campo "age" é obrigatório'
    });
  } else if (!validateAge) {
    res.status(400).send({
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18'
    });
  } else next();
};


function validateTalk (req, res, next) {
if (!req.body.talk) {
    return res.status(400).send({
      message: 'O campo "talk" é obrigatório'
    });
};
const { talk } = req.body;
const { watchedAt, rate } = talk;
let formatoData = /^\d{2}\/\d{2}\/\d{4}$/;
const verifyRate = rate >= 1 && rate <= 5 && Number.isInteger(rate) && rate !== 0;
if (typeof(talk) !== 'object') {
  res.sendStatus(400);
} else if (!watchedAt) {
  return res.status(400).send({
    message: 'O campo "watchedAt" é obrigatório'
  });
} else if (!formatoData.test(watchedAt)) {
  return res.status(400).send({
    message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"'
  });
} else if (!rate && rate !== 0) {
  return res.status(400).send({
    message: 'O campo "rate" é obrigatório'
  });
} else if (!verifyRate) {
  return res.status(400).send({
    message: 'O campo "rate" deve ser um número inteiro entre 1 e 5'
  });
} else next();
}

module.exports = { validateTalk, validateTalkerInfo };