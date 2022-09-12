const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/users');

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

    res.status(201).json({
      ok: true,
      msg: 'register succesfully',
      uid: newUser.id,
      name,
      email,
      password
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
    console.log("🚀 ~ file: auth.controller.js ~ line 50 ~ loginUser ~ user", user)

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

    res.json({
      ok: true,
      msg: 'Login successfully',
      email
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Troubles at login'
    })
  }

}

const renovalToken = (req = request, res = response, next) => {

  res.json({
    ok: true,
    msg: 'renovalToken succesfully'
  })
}

module.exports = {
  createUser,
  loginUser,
  renovalToken
}