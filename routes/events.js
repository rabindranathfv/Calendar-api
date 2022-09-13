const { Router } = require('express');
const { check } = require('express-validator');

const { getEvents, updateEvent, createEvent, deleteEvent } = require('../controllers/events.controller');
const { isDate } = require('../helpers/isDate');
const { fieldsValidators } = require('../middlewares/fieldsValidators');
const { validateSesion } = require('../middlewares/validateSesion');

const router = Router();

// uses validateSession mdw for all routes
router.use( validateSesion );

router.get('/', getEvents);
router.post('/',[
  check('title', 'Title should be mandatory and non empty').not().isEmpty(),
  check('start', 'Start date should be mandatory').custom(isDate),
  check('end', 'end date should be mandatory').custom(isDate),
  fieldsValidators
] ,createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);


module.exports = router;