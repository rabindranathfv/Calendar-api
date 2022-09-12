const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/users');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req = request, res = response, next) => {

  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'there is one user with that info'
      })
    }

    const newUser = new User(req.body);

    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync( password, salt);

    await newUser.save();

    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      msg: 'register succesfully',
      uid: newUser.id,
      name,
      email,
      token
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Troubles create user'
    })
  }
}

const loginUser = async(req = request, res = response, next) => {

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'there is one user with that info'
      })
    }

    const validPsw = bcrypt.compareSync(password, user.password);

    if ( !validPsw ) {
      return res.status(400).json({
        ok: false,
        msg: 'incorrect password, please check your credentials'
      })
    }

    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      msg: 'Login successfully',
      uid: user.id,
      name: user.name,
      email,
      token
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Troubles at login'
    })
  }

}

const renovalToken = async(req = request, res = response, next) => {

  const { uid, name } = req;

  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    msg: 'renovalToken succesfully',
    uid,
    name,
    token
  })
}

module.exports = {
  createUser,
  loginUser,
  renovalToken
}