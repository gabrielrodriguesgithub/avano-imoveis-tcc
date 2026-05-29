const { run, get, all } = require('../config/db');

function createProperty(property) {
  const sql = `INSERT INTO properties (title, description, type, neighborhood, price, status, bedrooms, bathrooms, area, address, owner_id, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  return run(sql, [
    property.title,
    property.description,
    property.type,
    property.neighborhood,
    property.price,
    property.status,
    property.bedrooms,
    property.bathrooms,
    property.area,
    property.address,
    property.owner_id,
    property.image_url
  ]);
}

function findProperties(filters = {}) {
  const conditions = [];
  const params = [];

  if (filters.type) {
    conditions.push('type = ?');
    params.push(filters.type);
  }
  if (filters.neighborhood) {
    conditions.push('neighborhood = ?');
    params.push(filters.neighborhood);
  }
  if (filters.status) {
    conditions.push('status = ?');
    params.push(filters.status);
  }
  if (filters.minPrice) {
    conditions.push('price >= ?');
    params.push(filters.minPrice);
  }
  if (filters.maxPrice) {
    conditions.push('price <= ?');
    params.push(filters.maxPrice);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const sql = `SELECT * FROM properties ${where} ORDER BY created_at DESC`;

  return all(sql, params);
}

function findPropertyById(id) {
  return get('SELECT * FROM properties WHERE id = ?', [id]);
}

function updateProperty(id, property) {
  const sql = `UPDATE properties SET title = ?, description = ?, type = ?, neighborhood = ?, price = ?, status = ?, bedrooms = ?, bathrooms = ?, area = ?, address = ?, owner_id = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
  return run(sql, [
    property.title,
    property.description,
    property.type,
    property.neighborhood,
    property.price,
    property.status,
    property.bedrooms,
    property.bathrooms,
    property.area,
    property.address,
    property.owner_id,
    property.image_url,
    id
  ]);
}

function deleteProperty(id) {
  return run('DELETE FROM properties WHERE id = ?', [id]);
}

module.exports = {
  createProperty,
  findProperties,
  findPropertyById,
  updateProperty,
  deleteProperty,
};
