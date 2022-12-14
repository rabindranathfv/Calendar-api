const jwt = require('jsonwebtoken');

const generateJWT = ( uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name};
    jwt.sign(payload, process.env.JWT_SECRET_SEED, { expiresIn: '12h' }, (err, token) => {
      if (err) {
        console.log(err);
        reject('can not generate jwt token')
      }
      resolve(token)
    });
  })
}

module.exports = {
  generateJWT
}