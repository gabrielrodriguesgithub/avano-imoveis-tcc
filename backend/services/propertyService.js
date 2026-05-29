const propertyModel = require('../models/propertyModel');

async function listProperties(filters) {
  return propertyModel.findProperties(filters);
}

async function getPropertyById(id) {
  const property = await propertyModel.findPropertyById(id);
  if (!property) {
    throw { status: 404, message: 'Imóvel não encontrado' };
  }
  return property;
}

async function createProperty(data) {
  const required = ['title', 'status'];
  const missing = required.filter((field) => !data[field]);

  if (missing.length) {
    throw { status: 400, message: `Campos obrigatórios ausentes: ${missing.join(', ')}` };
  }

  const result = await propertyModel.createProperty(data);
  return { id: result.lastID, ...data };
}

async function updateProperty(id, data) {
  const property = await propertyModel.findPropertyById(id);
  if (!property) {
    throw { status: 404, message: 'Imóvel não encontrado' };
  }

  await propertyModel.updateProperty(id, data);
  return getPropertyById(id);
}

async function deleteProperty(id) {
  const property = await propertyModel.findPropertyById(id);
  if (!property) {
    throw { status: 404, message: 'Imóvel não encontrado' };
  }

  await propertyModel.deleteProperty(id);
  return { message: 'Imóvel excluído com sucesso' };
}

module.exports = {
  listProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};
