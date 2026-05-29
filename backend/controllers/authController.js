const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/response');

async function register(req, res) {
  try {
    const user = await authService.register(req.body);
    return successResponse(res, user, 'Cadastro realizado com sucesso');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao cadastrar usuário');
  }
}

async function login(req, res) {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    return successResponse(res, result, 'Login realizado com sucesso');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao realizar login');
  }
}

async function resetPassword(req, res) {
  try {
    const result = await authService.resetPassword(req.body.email);
    return successResponse(res, result, 'Solicitação de redefinição enviada');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao solicitar redefinição de senha');
  }
}

async function me(req, res) {
  try {
    const user = await authService.getProfile(req.user.id);
    return successResponse(res, user, 'Perfil carregado com sucesso');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao carregar perfil');
  }
}

async function logout(req, res) {
  return successResponse(res, null, 'Logout realizado com sucesso');
}

module.exports = {
  register,
  login,
  resetPassword,
  me,
  logout,
};
