const { run, get, all } = require('../config/db');

function createAppointment(appointment) {
  const sql = `INSERT INTO appointments (user_id, property_id, scheduled_date, scheduled_time, status, notes) VALUES (?, ?, ?, ?, ?, ?)`;
  return run(sql, [
    appointment.user_id,
    appointment.property_id,
    appointment.scheduled_date,
    appointment.scheduled_time,
    appointment.status || 'pendente',
    appointment.notes
  ]);
}

function findAppointments() {
  return all(`
    SELECT a.*, u.first_name || ' ' || u.last_name AS user_name, p.title AS property_title
    FROM appointments AS a
    LEFT JOIN users AS u ON a.user_id = u.id
    LEFT JOIN properties AS p ON a.property_id = p.id
    ORDER BY a.created_at DESC
  `);
}

function findAppointmentById(id) {
  return get('SELECT * FROM appointments WHERE id = ?', [id]);
}

function updateAppointment(id, appointment) {
  const sql = `UPDATE appointments SET scheduled_date = ?, scheduled_time = ?, status = ?, notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
  return run(sql, [appointment.scheduled_date, appointment.scheduled_time, appointment.status, appointment.notes, id]);
}

function deleteAppointment(id) {
  return run('DELETE FROM appointments WHERE id = ?', [id]);
}

module.exports = {
  createAppointment,
  findAppointments,
  findAppointmentById,
  updateAppointment,
  deleteAppointment,
};
