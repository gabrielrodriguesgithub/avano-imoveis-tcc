const express = require('express');
const { listAppointments, getAppointmentById, createAppointment, updateAppointment, deleteAppointment } = require('../controllers/appointmentController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.get('/', listAppointments);
router.get('/:id', getAppointmentById);
router.post('/', createAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

module.exports = router;
