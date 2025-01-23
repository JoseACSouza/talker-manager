function validateToken(req, res, next) {
  const authorization = req.header('authorization');
  if (!authorization) {
    res.status(401).send({ message: 'Token não encontrado' });
  } else if (typeof (authorization) !== 'string' || authorization.length !== 16) {
    res.status(401).send({ message: 'Token inválido' });
  } else {
    next();
  }
}

module.exports = { validateToken };