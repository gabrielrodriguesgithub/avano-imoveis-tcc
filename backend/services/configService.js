const configModel = require('../models/configModel');

async function getConfig() {
  const rows = await configModel.getAllConfig();
  const config = rows.reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});
  return config;
}

async function updateConfig(key, value) {
  if (!key || value === undefined) {
    throw { status: 400, message: 'key e value são obrigatórios' };
  }
  await configModel.upsertConfig(key, value);
  return { key, value };
}

module.exports = {
  getConfig,
  updateConfig,
};
