const express = require('express');
const { body, validationResult } = require('express-validator');
const Appointment = require('../models/Appointment');

const router = express.Router();

// Validation rules
const appointmentValidation = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[\d\-\+\s]{7,}$/)
    .withMessage('Invalid phone number'),
  body('date').isDate().withMessage('Valid date is required'),
  body('time').trim().notEmpty().withMessage('Preferred time is required'),
  body('reason').trim().notEmpty().withMessage('Reason for visit is required'),
];

// POST /api/appointments — book a new appointment
router.post('/', appointmentValidation, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { fullName, phone, date, time, reason } = req.body;
    const appointment = await Appointment.create({ fullName, phone, date, time, reason });

    res.status(201).json({ success: true, message: 'Appointment booked successfully', data: appointment });
  } catch (err) {
    next(err);
  }
});

// GET /api/appointments — list all (public summary, intentionally limited)
router.get('/', async (req, res, next) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, data: appointments });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
