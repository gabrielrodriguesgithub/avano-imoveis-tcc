const supportModel = require('../models/supportModel');

async function createSupportMessage(data, userId) {
  const required = ['name', 'email', 'subject', 'message'];
  const missing = required.filter((field) => !data[field]);

  if (missing.length) {
    throw { status: 400, message: `Campos obrigatórios ausentes: ${missing.join(', ')}` };
  }

  const result = await supportModel.createSupportMessage({
    user_id: userId || null,
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    status: data.status || 'novo'
  });

  return { id: result.lastID, user_id: userId || null, ...data };
}

async function listSupportMessages() {
  return supportModel.findSupportMessages();
}

async function getSupportMessageById(id) {
  const message = await supportModel.findSupportMessageById(id);
  if (!message) {
    throw { status: 404, message: 'Mensagem de suporte não encontrada' };
  }
  return message;
}

async function updateSupportMessage(id, data) {
  const existing = await supportModel.findSupportMessageById(id);
  if (!existing) {
    throw { status: 404, message: 'Mensagem de suporte não encontrada' };
  }
  await supportModel.updateSupportMessage(id, data);
  return getSupportMessageById(id);
}

async function deleteSupportMessage(id) {
  const existing = await supportModel.findSupportMessageById(id);
  if (!existing) {
    throw { status: 404, message: 'Mensagem de suporte não encontrada' };
  }
  await supportModel.deleteSupportMessage(id);
  return { message: 'Mensagem de suporte excluída com sucesso' };
}

module.exports = {
  createSupportMessage,
  listSupportMessages,
  getSupportMessageById,
  updateSupportMessage,
  deleteSupportMessage,
};
