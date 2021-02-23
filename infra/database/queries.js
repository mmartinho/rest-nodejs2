const conexao = require('./connection');

const executeQuery = (query, params='') => {
    /**
     * Comportamento comum de uma Query:
     * - executa o comando "query", com ou sem "params"
     * - retorna uma "promessa" de "resultados", ou de "erros"
     */
    return new Promise((resolve, reject) => {
        conexao.query(query, params, (erros, resultados, campos) => {
            if(erros) {
                reject(erros);
            } else {
                resolve(resultados, campos);
            }
        });
    });
}

module.exports = executeQuery;