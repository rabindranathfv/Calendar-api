
const getEvents = (req, res, next) => {

  res.json({
    ok: true,
    msg: 'getEvents succesfully'
  })
}

const createEvent = (req, res, next) => {
  console.log(req.body)

  res.json({
    ok: true,
    msg: 'createEvent succesfully'
  })
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