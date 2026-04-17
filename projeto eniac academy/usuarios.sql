CREATE DATABASE IF NOT EXISTS dashboard_db;
USE dashboard_db;

-- Criar tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Hash da senha
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir usuário (C)
INSERT INTO users (name, email, password) VALUES ('Admin', 'admin@email.com', '123456');

-- Selecionar todos os usuários (R)
SELECT * FROM users;

-- Atualizar usuário (U)
UPDATE users SET name = 'Novo Nome' WHERE id = 1;

-- Deletar usuário (D)
DELETE FROM users WHERE id = 1;
