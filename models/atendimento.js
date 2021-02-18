const conexao = require('../infra/connection');
const moment = require('moment');
const AtendimentoValidation = require('./atendimento-validation');

/**
 * Modelo "Atendimento"
 */
class Atendimento {
    /**
     * Salva NOVO atendimento no BD
     * @param atendimento
     * @param res 
     */
    adiciona(atendimento, res) {
        /**
         * Data do atendimento que foi passada no formado DD/MM/YYYY convertida para ISO
         */
        const dataAtendimento = moment(atendimento.dataAtendimento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        /**
         * Adiciona a data atual do servidor ao atendimento no formato ISO
         */
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const atendimentoDatado = {...atendimento, dataCriacao, dataAtendimento};

        const validacao = new AtendimentoValidation(atendimentoDatado);

        if(validacao.existemErros()) {
            res.status(400).json(validacao.listaErros());
        } else {
            const sql = `INSERT INTO Atendimentos SET ?`;
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro) {
                    console.log(erro);
                    /**
                     * 400: Bad request
                     */
                    res.status(400).json(erro);
                } else {
                    console.log('Atendimento adicionado com sucesso');
                    console.log(resultados);
                    console.log(atendimentoDatado);
                    /**
                     * 201: Created 
                     */    
                    res.status(201).json({...resultados, atendimento : atendimentoDatado});
                }
            });
        }
    }

    /**
     * Lista todos os atendimentos
     * @param {*} res 
     */
    lista(res) {
        const sql = `SELECT * FROM Atendimentos`;

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                console.log(erro);
                /**
                 * 500: Internal server error
                 */                
                res.status(500).json(erro);
            } else {
                res.status(200).json(resultados);
            }
        });
    }

    /**
     * Mostra o atendimento com o id 
     * @param {*} id 
     * @param {*} res 
     */
    buscaPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id=?`;

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                console.log(erro);
                /**
                 * 404: Not Found
                 */                
                res.status(404).json(erro);
            } else {
                const atendimento = resultados[0];
                res.status(200).json(atendimento);
            }
        });        
    }

    /**
     * Modifica um atendimento com o id 
     * @param {*} id 
     * @param {*} val 
     * @param {*} res 
     */
    altera(id, val, res) {
        let validacao = null;
        /**
         * Caso tenha Data do atendimento passada no formado DD/MM/YYYY é convertida para ISO
         */        
        if(val.dataAtendimento) {
            const dataAtendimento = moment(val.dataAtendimento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
            val = {...val, dataAtendimento};
        }

        validacao = new AtendimentoValidation(val);
        if(validacao.existemErros()) {
            res.status(400).json(validacao.listaErros());
        } else {
            const sql = `UPDATE Atendimentos SET ? WHERE id=?`;
            conexao.query(sql, [val, id], (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro);
                } else {
                    res.status(200).json({...resultados, atendimento : val});
                }
            });
        }
    }

    /**
     * Exclui o atendimento com o id
     * @param {*} id 
     * @param {*} res 
     */
    deleta(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id=?';

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({...resultados, atendimento : {id} });
            }
        });
    }
}

module.exports = new Atendimento();