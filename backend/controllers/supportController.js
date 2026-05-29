const supportService = require('../services/supportService');
const { successResponse, errorResponse } = require('../utils/response');

async function createMessage(req, res) {
  try {
    const message = await supportService.createSupportMessage(req.body, req.user?.id);
    return successResponse(res, message, 'Mensagem de suporte criada com sucesso');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao enviar mensagem de suporte');
  }
}

async function listMessages(req, res) {
  try {
    const messages = await supportService.listSupportMessages();
    return successResponse(res, messages, 'Mensagens de suporte listadas com sucesso');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao listar mensagens de suporte');
  }
}

async function getMessageById(req, res) {
  try {
    const message = await supportService.getSupportMessageById(req.params.id);
    return successResponse(res, message, 'Mensagem de suporte encontrada');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao buscar mensagem de suporte');
  }
}

async function updateMessage(req, res) {
  try {
    const message = await supportService.updateSupportMessage(req.params.id, req.body);
    return successResponse(res, message, 'Mensagem de suporte atualizada com sucesso');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao atualizar mensagem de suporte');
  }
}

async function deleteMessage(req, res) {
  try {
    const result = await supportService.deleteSupportMessage(req.params.id);
    return successResponse(res, result, 'Mensagem de suporte excluída com sucesso');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao excluir mensagem de suporte');
  }
}

module.exports = {
  createMessage,
  listMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
};
