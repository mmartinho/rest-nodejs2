const moment = require('moment');

/**
 * Validacao de atendimento
 */
class PetValidation {
    constructor(pet) {
        this.pet = pet;
        this.validacoes = [
            {
                nome: 'nome',
                valido: this.petEhValido(),
                mensagem: 'Nome do pet deve ter pelo menos dois caracteres'
            },
            {
                nome: 'imagem',
                valido: this.arquivoValido(),
                mensagem: 'O nome do arquivo não é válido'
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
    petEhValido() {
        return this.pet.nome 
            ? this.pet.nome.length >= 2 
            : true;
    }  
    
    /**
     * 
     */
    arquivoValido() {
       return this.pet.imagem 
           ? this.pet.imagem.length > 0
           : true; 
    }
}

module.exports = PetValidation;