/** Tabela de Atendimentos Original */
CREATE TABLE IF NOT EXISTS Atendimentos (
    id int NOT NULL AUTO_INCREMENT,
    cliente VARCHAR(50) NOT NULL, 
    pet VARCHAR(20),
    servico VARCHAR(20) NOT NULL, 
    status VARCHAR(20) NOT NULL,
    observacoes TEXT, 
    PRIMARY KEY (id)
);