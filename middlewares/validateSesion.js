const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const validateSesion = (req = request, res = response, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'no token available'
    })
  }

  try {
    const { uid, name, exp } = jwt.verify(token, process.env.JWT_SECRET_SEED)
    req.uid = uid;
    req.name = name;
    req.expiresIn = exp;

    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      ok: false,
      msg: 'invalid token'
    })
  }
}

module.exports = {
  validateSesion
}