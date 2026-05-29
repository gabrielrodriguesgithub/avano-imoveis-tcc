const { errorResponse } = require('../utils/response');

function errorHandler(err, req, res, next) {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || 500;
  const message = err.message || 'Erro interno do servidor';

  return errorResponse(res, status, message);
}

module.exports = {
  errorHandler,
};
