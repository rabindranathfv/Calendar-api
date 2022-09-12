const { Schema, model} = require('mongoose');


const UserSchema = Schema({
  name:{
    type: String,
    requiere: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  password:{
    type: String,
    require: true
  }
})

module.exports = model('User', UserSchema);