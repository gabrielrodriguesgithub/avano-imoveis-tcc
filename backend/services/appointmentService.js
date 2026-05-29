const appointmentModel = require('../models/appointmentModel');
const propertyModel = require('../models/propertyModel');

async function listAppointments() {
  return appointmentModel.findAppointments();
}

async function getAppointmentById(id) {
  const appointment = await appointmentModel.findAppointmentById(id);
  if (!appointment) {
    throw { status: 404, message: 'Agendamento não encontrado' };
  }
  return appointment;
}

async function createAppointment(data, userId) {
  const required = ['property_id', 'scheduled_date', 'scheduled_time'];
  const missing = required.filter((field) => !data[field]);

  if (missing.length) {
    throw { status: 400, message: `Campos obrigatórios ausentes: ${missing.join(', ')}` };
  }

  const property = await propertyModel.findPropertyById(data.property_id);
  if (!property) {
    throw { status: 404, message: 'Imóvel não encontrado' };
  }

  const result = await appointmentModel.createAppointment({
    user_id: userId,
    property_id: data.property_id,
    scheduled_date: data.scheduled_date,
    scheduled_time: data.scheduled_time,
    status: data.status || 'pendente',
    notes: data.notes || null
  });

  return { id: result.lastID, ...data, user_id: userId };
}

async function updateAppointment(id, data) {
  const appointment = await appointmentModel.findAppointmentById(id);
  if (!appointment) {
    throw { status: 404, message: 'Agendamento não encontrado' };
  }

  await appointmentModel.updateAppointment(id, data);
  return getAppointmentById(id);
}

async function deleteAppointment(id) {
  const appointment = await appointmentModel.findAppointmentById(id);
  if (!appointment) {
    throw { status: 404, message: 'Agendamento não encontrado' };
  }

  await appointmentModel.deleteAppointment(id);
  return { message: 'Agendamento excluído com sucesso' };
}

module.exports = {
  listAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
