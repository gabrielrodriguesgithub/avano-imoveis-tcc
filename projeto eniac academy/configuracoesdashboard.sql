-- configuracoes.sql

CREATE TABLE IF NOT EXISTS configuracoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chave VARCHAR(50) UNIQUE NOT NULL,
    valor VARCHAR(255) NOT NULL,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Valor padrão para o tema
INSERT INTO configuracoes (chave, valor)
VALUES ('tema', 'claro')
ON DUPLICATE KEY UPDATE valor = VALUES(valor);
