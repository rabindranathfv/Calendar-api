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
        msg: 'there is one user with that email'
      })
    }

    const newUser = new User(req.body);
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

const loginUser = (req = request, res = response, next) => {

  console.log("saludos desde el loginUser")
  const { email, password } = req.body;

  res.json({
    ok: true,
    msg: 'Login successfully',
    email
  })
}

const renovalToken = (req = request, res = response, next) => {

  console.log("saludos desde el renovalToken")
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