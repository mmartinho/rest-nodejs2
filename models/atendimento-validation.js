const moment = require('moment');

/**
 * Validacao de atendimento
 */
class AtendimentoValidation {
    constructor(atendimento) {
        this.atendimento = atendimento;
        this.validacoes = [
            {
                nome: 'dataAtendimento',
                valido: this.dataEhValida(),
                mensagem: 'Data de atendimento deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido(),
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ];
    }

    /**
     * @returns boolean
     */
    existemErros() {
        this.erros = this.validacoes.filter(campo => !campo.valido);
        return this.erros.length;
    }

    /**
     * @returns Vetor de validadoes
     */
    listaErros() {
        return this.erros;
    }

    /**
     * @returns boolean
     */
    dataEhValida() {
        return this.atendimento.dataAtendimento 
            ? moment(this.atendimento.dataAtendimento).isSameOrAfter(this.atendimento.dataCriacao) 
            : true;
    }

    /**
     * @returns boolean
     */
    clienteEhValido() {
        return this.atendimento.cliente 
            ? this.atendimento.cliente.length >= 5 
            : true;
    }    
}

module.exports = AtendimentoValidation;