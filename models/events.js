const { Schema, model} = require('mongoose');


const EventSchema = Schema({
  title:{
    type: String,
    requiere: true
  },
  notes: {
    type: String,
    require: true,
    unique: true
  },
  start:{
    type: Date,
    require: true
  },
  end:{
    type: Date,
    require: true
  },
  user: {
    // reference another model combine with ref attribute
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('Event', EventSchema);