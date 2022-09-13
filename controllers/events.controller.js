const { model } = require('mongoose');
const Event = require('../models/events');

const getEvents = async(req, res, next) => {

  try {
    // populate methods allow to bring data for another models, you can lis the attributes
    const events = await Event.find().populate('user', 'name email');

    return res.json({
      ok: true,
      msg: 'getEvents succesfully',
      events
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Troubles create and Event succesfully'
    })
  }
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
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Troubles create and Event succesfully'
    });
  }

}

const updateEvent = async(req, res, next) => {

  const id = req.params.id;
  try {
    const event = await Event.findById(id);
    const userId = req.uid;

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Event does not exist'
      });
    }

    if (event.user.toString() !== userId ) {
      return res.status(401).json({
        ok: false,
        msg: 'this event is not yours, you can not edit this event'
      });
    }

    const dataEvent = {
      ...req.body,
      user: userId
    }

    // last parameter return the updated instance of the model, if not send the object before upd
    const updEvent = await Event.findByIdAndUpdate( id, dataEvent, { new: true} )

    return res.json({
      ok: true,
      msg: 'updateEvent succesfully',
      event: updEvent
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Troubles update an Event'
    });
  }
}

const deleteEvent = async(req, res, next) => {
  const id = req.params.id;
  const userId = req.uid;
  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'Event does not exist'
      });
    }

    if (event.user.toString() !== userId ) {
      return res.status(401).json({
        ok: false,
        msg: 'this event is not yours, you can not delete this event'
      });
    }

    const deleteEvent = await Event.findByIdAndDelete( id );

    return res.json({
      ok: true,
      msg: 'deleteEvent succesfully',
      id: deleteEvent.id
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Troubles update an Event'
    });
  }

}

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
}