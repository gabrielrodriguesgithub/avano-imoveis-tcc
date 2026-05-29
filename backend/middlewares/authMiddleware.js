const jwt = require('jsonwebtoken');
const { errorResponse } = require('../utils/response');

const jwtSecret = process.env.JWT_SECRET || 'change_this_secret';

function authMiddleware(req, res, next) {
  const authorization = req.header('Authorization');

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return errorResponse(res, 401, 'Token de autorização ausente ou inválido');
  }

  const token = authorization.replace('Bearer ', '').trim();

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    return next();
  } catch (error) {
    return errorResponse(res, 401, 'Token expirado ou inválido');
  }
}

module.exports = {
  authMiddleware,
};
