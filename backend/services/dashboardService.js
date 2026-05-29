const { get, all } = require('../config/db');

async function getStats() {
  const users = await get('SELECT COUNT(*) AS count FROM users');
  const properties = await get('SELECT COUNT(*) AS count FROM properties');
  const appointments = await get('SELECT COUNT(*) AS count FROM appointments');

  return {
    totalUsers: users.count,
    totalProperties: properties.count,
    totalAppointments: appointments.count
  };
}

async function getMetrics() {
  const newUsers = await get(`
    SELECT COUNT(*) AS count
    FROM users
    WHERE date(created_at) >= date('now', '-7 days')
  `);

  const appointmentStatus = await all(`
    SELECT status, COUNT(*) AS count
    FROM appointments
    GROUP BY status
  `);

  return {
    newUsersLast7Days: newUsers.count,
    appointmentStatus
  };
}

async function getVisitsMonthly() {
  const rows = await all(`
    SELECT strftime('%Y-%m', created_at) AS month, COUNT(*) AS count
    FROM appointments
    GROUP BY month
    ORDER BY month ASC
  `);
  return rows;
}

module.exports = {
  getStats,
  getMetrics,
  getVisitsMonthly,
};
