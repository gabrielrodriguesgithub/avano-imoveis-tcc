const userModel = require('../models/userModel');
const { validateEmail } = require('../utils/validators');

async function listUsers() {
  return userModel.findAll();
}

async function getUserById(id) {
  const user = await userModel.findById(id);
  if (!user) {
    throw { status: 404, message: 'Usuário não encontrado' };
  }
  return user;
}

async function createUser(data) {
  const { first_name, last_name, username, email, password, role } = data;

  if (!first_name || !email || !password) {
    throw { status: 400, message: 'first_name, email e password são obrigatórios' };
  }

  if (!validateEmail(email)) {
    throw { status: 400, message: 'Email inválido' };
  }

  const existing = await userModel.findByEmail(email);
  if (existing) {
    throw { status: 409, message: 'Email já cadastrado' };
  }

  const password_hash = require('bcryptjs').hashSync(password, 10);

  const result = await userModel.createUser({
    first_name,
    last_name,
    username,
    email,
    password_hash,
    role: role || 'user'
  });

  return { id: result.lastID, first_name, last_name, username, email, role: role || 'user' };
}

async function updateUser(id, data) {
  const existing = await userModel.findById(id);
  if (!existing) {
    throw { status: 404, message: 'Usuário não encontrado' };
  }

  if (data.email && !validateEmail(data.email)) {
    throw { status: 400, message: 'Email inválido' };
  }

  await userModel.updateUser(id, data);
  return getUserById(id);
}

async function deleteUser(id) {
  const existing = await userModel.findById(id);
  if (!existing) {
    throw { status: 404, message: 'Usuário não encontrado' };
  }
  await userModel.deleteUser(id);
  return { message: 'Usuário excluído com sucesso' };
}

module.exports = {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
