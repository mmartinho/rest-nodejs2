const query = require('../infra/database/queries');

class Atendimento {

    /** 
     * Passa a instrução SQL de inserção para a "promessa"
     * @see infra\database\queries.js
     */
    adiciona(atendimento) {
        const sql = `INSERT INTO Atendimentos SET ?`;
        return query(sql, atendimento);
    }

    /**
     * Passa a instrução SQL de seleção sem 
     * parâmetros para a "promessa"
     */
    lista () {
        const sql = `SELECT * FROM Atendimentos`;
        return query(sql);
    }

    /**
     * Passa a instrução SQl de seleção com 
     * um parâmetro para a "promessa"
     * @param {*} id 
     */
    buscaPorId(id) {
        const sql = `SELECT * FROM Atendimentos WHERE id=?`;
        return query(sql, id);
    }

    /**
     * Passa a instrução SQL para exclusão com 
     * um parâmetro para a "promessa"
     * @param {*} id 
     */
    deleta(id) {
        const sql = 'DELETE FROM Atendimentos WHERE id=?';
        return query(sql, id);
    }

    /**
     * Passa a instrução SQL para a alteração com
     * um parâmetro para a "promessa"
     * @param {*} id
     * @param {*} vals
     */
    altera(id, vals) {
        const sql = `UPDATE Atendimentos SET ? WHERE id=?`;
        return query(sql, [vals, id]);
    }
    
}

module.exports = new Atendimento();