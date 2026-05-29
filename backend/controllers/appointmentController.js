const appointmentService = require('../services/appointmentService');
const { successResponse, errorResponse } = require('../utils/response');

async function listAppointments(req, res) {
  try {
    const appointments = await appointmentService.listAppointments();
    return successResponse(res, appointments, 'Agendamentos listados com sucesso');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao listar agendamentos');
  }
}

async function getAppointmentById(req, res) {
  try {
    const appointment = await appointmentService.getAppointmentById(req.params.id);
    return successResponse(res, appointment, 'Agendamento encontrado');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao buscar agendamento');
  }
}

async function createAppointment(req, res) {
  try {
    const appointment = await appointmentService.createAppointment(req.body, req.user.id);
    return successResponse(res, appointment, 'Agendamento criado com sucesso');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao criar agendamento');
  }
}

async function updateAppointment(req, res) {
  try {
    const appointment = await appointmentService.updateAppointment(req.params.id, req.body);
    return successResponse(res, appointment, 'Agendamento atualizado com sucesso');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao atualizar agendamento');
  }
}

async function deleteAppointment(req, res) {
  try {
    const result = await appointmentService.deleteAppointment(req.params.id);
    return successResponse(res, result, 'Agendamento excluído com sucesso');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao excluir agendamento');
  }
}

module.exports = {
  listAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
};
