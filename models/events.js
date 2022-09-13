const { Schema, model} = require('mongoose');


const EventSchema = Schema({
  title:{
    type: String,
    requiered: true
  },
  notes: {
    type: String
  },
  start:{
    type: Date,
    requiered: true
  },
  end:{
    type: Date,
    requiered: true
  },
  user: {
    // reference another model combine with ref attribute
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

// customize Response for endpoint after mongo save instance
EventSchema.method('toJSON', function() {
  const { __v, _id, ...object} = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('Event', EventSchema);