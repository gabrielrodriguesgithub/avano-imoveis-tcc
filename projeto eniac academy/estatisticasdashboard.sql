-- Criar o banco de dados (se não existir)
CREATE DATABASE IF NOT EXISTS dashboard_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE dashboard_db;

-- Tabela: estatisticas
CREATE TABLE IF NOT EXISTS estatisticas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    categoria VARCHAR(100) NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CRUD exemplos:

-- Criar (Create)
INSERT INTO estatisticas (categoria, valor) VALUES ('Crescimento', 25.50);

-- Ler (Read)
SELECT * FROM estatisticas;

-- Atualizar (Update)
UPDATE estatisticas SET valor = 30.00 WHERE id = 1;

-- Deletar (Delete)
DELETE FROM estatisticas WHERE id = 1;
