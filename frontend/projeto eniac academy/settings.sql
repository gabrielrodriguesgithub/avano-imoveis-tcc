-- Criação do banco de dados (caso não exista)
CREATE DATABASE IF NOT EXISTS dashboard_db;

-- Seleciona o banco de dados
USE dashboard_db;

-- Criação da tabela de usuários (users)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- ID do usuário, chave primária, auto-incrementável
    email VARCHAR(255) NOT NULL UNIQUE,         -- Email do usuário (único e não nulo)
    password VARCHAR(255) NOT NULL,             -- Senha do usuário (armazenada de forma segura)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Data de criação do usuário
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Data de atualização do usuário
);

-- Inserção de um usuário de exemplo (pode ser removido em produção)
-- Inserir dados de exemplo (Lembre-se de usar um hash real de senha para produção)
INSERT INTO users (email, password) VALUES 
('exemplo@dominio.com', 'senha_forte'); -- Isso é apenas um exemplo, substitua por um hash de senha real!
