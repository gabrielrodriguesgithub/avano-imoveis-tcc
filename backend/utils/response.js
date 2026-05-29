function successResponse(res, data = null, message = '') {
  return res.json({ success: true, data, message });
}

function errorResponse(res, status = 400, message = 'Erro no servidor', data = null) {
  return res.status(status).json({ success: false, data, message });
}

module.exports = {
  successResponse,
  errorResponse,
};
