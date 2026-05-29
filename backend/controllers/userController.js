const userService = require('../services/userService');
const { successResponse, errorResponse } = require('../utils/response');

async function listUsers(req, res) {
  try {
    const users = await userService.listUsers();
    return successResponse(res, users, 'Usuários listados com sucesso');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao listar usuários');
  }
}

async function getUserById(req, res) {
  try {
    const user = await userService.getUserById(req.params.id);
    return successResponse(res, user, 'Usuário encontrado');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao buscar usuário');
  }
}

async function createUser(req, res) {
  try {
    const user = await userService.createUser(req.body);
    return successResponse(res, user, 'Usuário criado com sucesso');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao criar usuário');
  }
}

async function updateUser(req, res) {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    return successResponse(res, user, 'Usuário atualizado com sucesso');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao atualizar usuário');
  }
}

async function deleteUser(req, res) {
  try {
    const result = await userService.deleteUser(req.params.id);
    return successResponse(res, result, 'Usuário excluído com sucesso');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao excluir usuário');
  }
}

module.exports = {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
