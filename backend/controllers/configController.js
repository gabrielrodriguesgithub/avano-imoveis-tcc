const configService = require('../services/configService');
const { successResponse, errorResponse } = require('../utils/response');

async function getConfig(req, res) {
  try {
    const config = await configService.getConfig();
    return successResponse(res, config, 'Configurações carregadas com sucesso');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao carregar configurações');
  }
}

async function updateConfig(req, res) {
  try {
    const config = await configService.updateConfig(req.body.key, req.body.value);
    return successResponse(res, config, 'Configuração atualizada com sucesso');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao atualizar configuração');
  }
}

module.exports = {
  getConfig,
  updateConfig,
};
