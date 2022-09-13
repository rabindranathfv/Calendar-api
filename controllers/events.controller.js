const Event = require('../models/events');

const getEvents = (req, res, next) => {

  res.json({
    ok: true,
    msg: 'getEvents succesfully'
  })
}

const createEvent = async(req, res, next) => {

  try {
    const newEvent = new Event(req.body);
    newEvent.user = req.uid;
    await newEvent.save();

    return res.json({
      ok: true,
      msg: 'createEvent succesfully',
      event: newEvent
    })
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: 'Troubles create and Event succesfully'
    })
  }

}

const updateEvent = (req, res, next) => {

  res.json({
    ok: true,
    msg: 'updateEvent succesfully'
  })
}

const deleteEvent = (req, res, next) => {

  res.json({
    ok: true,
    msg: 'deleteEvent succesfully'
  })
}

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
}