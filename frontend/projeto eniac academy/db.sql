-- Criar o banco de dados (caso ainda não exista)
CREATE DATABASE IF NOT EXISTS dashboard_db
CHARACTER SET utf8
COLLATE utf8_general_ci;

-- Usar o banco de dados
USE dashboard_db;

-- Criar a tabela de configurações
CREATE TABLE IF NOT EXISTS configuracoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chave VARCHAR(50) UNIQUE NOT NULL,
    valor VARCHAR(255) NOT NULL
);

-- Inserir configuração inicial (tema claro por padrão)
INSERT INTO configuracoes (chave, valor)
VALUES ('tema', 'claro')
ON DUPLICATE KEY UPDATE valor = 'claro';

-- Criar a tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);
