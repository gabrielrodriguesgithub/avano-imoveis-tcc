const propertyService = require('../services/propertyService');
const { successResponse, errorResponse } = require('../utils/response');

async function listProperties(req, res) {
  try {
    const preco = req.query.preco;
    let minPrice = req.query.minPrice;
    let maxPrice = req.query.maxPrice;

    if (preco) {
      if (preco === '200') {
        maxPrice = 200000;
      } else if (preco === '500') {
        minPrice = 200000;
        maxPrice = 500000;
      } else if (preco === '1000') {
        minPrice = 500000;
      }
    }

    const filters = {
      type: req.query.tipo || req.query.type,
      neighborhood: req.query.bairro || req.query.neighborhood,
      status: req.query.status,
      minPrice,
      maxPrice
    };

    const properties = await propertyService.listProperties(filters);
    return successResponse(res, properties, 'Imóveis listados com sucesso');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao listar imóveis');
  }
}

async function getPropertyById(req, res) {
  try {
    const property = await propertyService.getPropertyById(req.params.id);
    return successResponse(res, property, 'Imóvel encontrado');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao buscar imóvel');
  }
}

async function createProperty(req, res) {
  try {
    const property = await propertyService.createProperty(req.body);
    return successResponse(res, property, 'Imóvel criado com sucesso');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao criar imóvel');
  }
}

async function updateProperty(req, res) {
  try {
    const property = await propertyService.updateProperty(req.params.id, req.body);
    return successResponse(res, property, 'Imóvel atualizado com sucesso');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao atualizar imóvel');
  }
}

async function deleteProperty(req, res) {
  try {
    const result = await propertyService.deleteProperty(req.params.id);
    return successResponse(res, result, 'Imóvel excluído com sucesso');
  } catch (error) {
    return errorResponse(res, error.status || 500, error.message || 'Erro ao excluir imóvel');
  }
}

module.exports = {
  listProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
