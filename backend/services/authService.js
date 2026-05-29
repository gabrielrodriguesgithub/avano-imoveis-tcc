const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { validateEmail } = require('../utils/validators');

const jwtSecret = process.env.JWT_SECRET || 'change_this_secret';
const jwtExpiry = '8h';

async function register(data) {
  const { first_name, last_name, username, email, password } = data;

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

  const password_hash = bcrypt.hashSync(password, 10);

  const result = await userModel.createUser({
    first_name,
    last_name,
    username,
    email,
    password_hash,
    role: 'user'
  });

  return { id: result.lastID, first_name, last_name, username, email, role: 'user' };
}

async function login(email, password) {
  if (!email || !password) {
    throw { status: 400, message: 'Email e senha são obrigatórios' };
  }

  const user = await userModel.findByEmail(email);

  if (!user) {
    throw { status: 401, message: 'Credenciais inválidas' };
  }

  const validPassword = bcrypt.compareSync(password, user.password_hash);

  if (!validPassword) {
    throw { status: 401, message: 'Credenciais inválidas' };
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    jwtSecret,
    { expiresIn: jwtExpiry }
  );

  return { token, user: { id: user.id, first_name: user.first_name, last_name: user.last_name, username: user.username, email: user.email, role: user.role } };
}

async function resetPassword(email) {
  if (!email) {
    throw { status: 400, message: 'Email é obrigatório' };
  }

  const user = await userModel.findByEmail(email);

  if (!user) {
    throw { status: 404, message: 'Email não encontrado' };
  }

  return { message: 'Se o email existir, você receberá instruções para redefinir a senha.' };
}

async function getProfile(userId) {
  const user = await userModel.findById(userId);

  if (!user) {
    throw { status: 404, message: 'Usuário não encontrado' };
  }

  return user;
}

module.exports = {
  register,
  login,
  resetPassword,
  getProfile,
};
