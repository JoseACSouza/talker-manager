function validateTalkerName(req, res, next) {
  const { name } = req.body;
  if (!name) {
    res.status(400).send({ 
      message: 'O campo "name" é obrigatório',
    });
  } else if (name.length < 3) {
    res.status(400).send({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  } else next();
}
  
  function validateTalkerAge(req, res, next) {
    const { age } = req.body;
    if (!age) {
    res.status(400).send({
      message: 'O campo "age" é obrigatório',
    });
  } else if (!(Number.isInteger(age) && age >= 18)) {
    res.status(400).send({
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  } else next();
}

function validateTalk(req, res, next) {
if (!req.body.talk) {
    return res.status(400).send({
      message: 'O campo "talk" é obrigatório',
    });
}
const { talk } = req.body;
if (typeof (talk) !== 'object') {
  res.sendStatus(400);
} else next();
}

function validateWatchedAt(req, res, next) {
  const { watchedAt } = req.body.talk;
  const formatoData = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!watchedAt) {
  return res.status(400).send({
    message: 'O campo "watchedAt" é obrigatório',
  });
} if (!formatoData.test(watchedAt)) {
  return res.status(400).send({
    message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  });
}next();
}

function isRateValid(rate) {
  return rate >= 1 && rate <= 5;
}

function isRateInteger(rate) {
  return Number.isInteger(rate);
}

function validateRate(req, res, next) {
  const { rate } = req.body.talk;
  const verifyRate = isRateValid(rate) && isRateInteger(rate);
  if (!rate && rate !== 0) {
  return res.status(400).send({
    message: 'O campo "rate" é obrigatório',
  });
} if (!verifyRate) {
  return res.status(400).send({
    message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
  });
} next();
}

module.exports = {
  validateTalk, validateWatchedAt, validateRate, validateTalkerName, validateTalkerAge,
};