const dashboardService = require('../services/dashboardService');
const { successResponse, errorResponse } = require('../utils/response');

async function getStats(req, res) {
  try {
    const stats = await dashboardService.getStats();
    return successResponse(res, stats, 'Estatísticas carregadas com sucesso');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao carregar estatísticas');
  }
}

async function getMetrics(req, res) {
  try {
    const metrics = await dashboardService.getMetrics();
    return successResponse(res, metrics, 'Métricas carregadas com sucesso');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao carregar métricas');
  }
}

async function getVisitsMonthly(req, res) {
  try {
    const visits = await dashboardService.getVisitsMonthly();
    return successResponse(res, visits, 'Dados de visitas mensais carregados com sucesso');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao carregar visitas mensais');
  }
}

module.exports = {
  getStats,
  getMetrics,
  getVisitsMonthly,
};
