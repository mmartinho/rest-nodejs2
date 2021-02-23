const conexao = require('../infra/database/connection');
const moment = require('moment');
const AtendimentoValidation = require('./atendimento-validation');
const repo = require('../repo/atendimento');
const { response } = require('express');

/**
 * Modelo "Atendimento"
 */
class Atendimento {
    /**
     * Adiciona um novo atendimento
     * @param atendimento
     */
    adiciona(atendimento) {
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
            return new Promise( (resolve, reject) => reject(validacao.listaErros()));
        } else {
            return repo.adiciona(atendimentoDatado).then( resultados => {
                return {...resultados, atendimento : atendimentoDatado};
            });
        }
    }

    /**
     * Lista todos os atendimentos 
     */
    lista() {
        return repo.lista();
    }

    /**
     * Mostra o atendimento com o id 
     * @param {*} id 
     */
    buscaPorId(id) {
        return repo.buscaPorId(id);      
    }

    /**
     * Modifica um atendimento com o id 
     * @param {*} id 
     * @param {*} vals  
     */
    altera(id, vals) {
        let validacao = null;
        /**
         * Caso tenha Data do atendimento passada no formado DD/MM/YYYY é convertida para ISO
         */        
        if(vals.dataAtendimento) {
            const dataAtendimento = moment(vals.dataAtendimento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
            vals = {...vals, dataAtendimento};
        }
        validacao = new AtendimentoValidation(vals);
        if(validacao.existemErros()) {
            return new Promise( (resolve, reject) => reject(validacao.listaErros()));
        } else {
            return repo.altera(id, vals).then( resultados => {
                return {...resultados, atendimento : vals};
            });            
        }
    }

    /**
     * Exclui o atendimento com o id
     * @param {*} id  
     */
    deleta(id) {
        return repo.deleta(id);     
    }
}

module.exports = new Atendimento();