const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { createUser, loginUser, renovalToken } = require('../controllers/auth.controller');
const { fieldsValidators } = require('../middlewares/fieldsValidators');
const { validateSesion } = require('../middlewares/validateSesion');

router.post('/register',
[
  check('name', 'the name is mandatory').not().isEmpty(),
  check('email', 'the email is mandatory').not().isEmpty().isEmail(),
  check('password', 'the password is mandatory and at least 6 characteres').not().isEmpty().isLength({min: 6}),
  fieldsValidators
],
createUser);
router.post('/',
[
  check('email', 'the email is mandatory').not().isEmpty().isEmail(),
  check('password', 'the password is mandatory and at least 6 characteres').not().isEmpty().isLength({min: 6}),
  fieldsValidators
],
loginUser);
router.get('/renew',validateSesion,renovalToken);

module.exports = router;

