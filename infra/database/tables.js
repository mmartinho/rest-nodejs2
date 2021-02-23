/**
 * "Migrations" de Tabelas
 */
class Tables {
    /**
     * @param {*} connection 
     */
    init(connection) {
        this.connection = connection;
        this.criarAtendimentos();
    }

    /**
     * Cria a tabela de atendimentos
     */
    criarAtendimentos() {
        const sql = `CREATE TABLE IF NOT EXISTS Atendimentos (
            id int NOT NULL AUTO_INCREMENT,
            cliente VARCHAR(50) NOT NULL, 
            pet VARCHAR(20),
            servico VARCHAR(20) NOT NULL, 
            status VARCHAR(20) NOT NULL,
            observacoes TEXT, 
            PRIMARY KEY (id)
        )`;
        this.connection.query(sql, (erro) => {
            if(erro) {
                console.log(erro);
            } else {
                console.log('Tabela Atendimentos criada com sucesso, ou já existia');
            }
        });
    }
}

/**
 * Exporta instanciando a classe
 */
module.exports = new Tables();