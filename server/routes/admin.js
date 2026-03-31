const express = require('express');
const Appointment = require('../models/Appointment');

const router = express.Router();

// Simple in-memory session tracking (for stateless API, we use a secret token approach)
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    return res.json({ success: true, token: Buffer.from(ADMIN_PASSWORD).toString('base64') });
  }
  return res.status(401).json({ success: false, message: 'Invalid password' });
});

// Middleware to verify admin token
const verifyAdmin = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  const token = auth.split(' ')[1];
  const decoded = Buffer.from(token, 'base64').toString('utf-8');
  if (decoded !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
  next();
};

// GET /api/admin/appointments — all appointments with filters
router.get('/appointments', verifyAdmin, async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = status ? { status } : {};
    const skip = (page - 1) * limit;

    const [appointments, total] = await Promise.all([
      Appointment.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Appointment.countDocuments(filter),
    ]);

    // Stats
    const [totalAll, pending, confirmed, cancelled] = await Promise.all([
      Appointment.countDocuments(),
      Appointment.countDocuments({ status: 'pending' }),
      Appointment.countDocuments({ status: 'confirmed' }),
      Appointment.countDocuments({ status: 'cancelled' }),
    ]);

    res.json({
      success: true,
      data: appointments,
      pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) },
      stats: { total: totalAll, pending, confirmed, cancelled },
    });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/admin/appointments/:id — update status
router.patch('/appointments/:id', verifyAdmin, async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });
    res.json({ success: true, data: appointment });
  } catch (err) {
    next(err);
  }
});

// DELETE /api/admin/appointments/:id
router.delete('/appointments/:id', verifyAdmin, async (req, res, next) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!appointment) return res.status(404).json({ success: false, message: 'Appointment not found' });
    res.json({ success: true, message: 'Appointment deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
