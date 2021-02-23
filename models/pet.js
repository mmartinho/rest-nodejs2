const conexao = require('../infra/database/connection');
const moment = require('moment');
const PetValidation = require('./pet-validation');
const uploadDeArquivo = require('../infra/arquivos/upload');

/**
 * Modelo "Pet"
 */
class Pet {
    /**
     * Faz upload da foto do pet e caso seja 
     * bem sucedido, e insere dados no BD
     * @param pet
     * @param res 
     */
    adiciona(pet, res) {
        uploadDeArquivo(
            pet.imagem, 
            /**
             * Função de sucesso
             */
            (novoCaminho) => {
                pet = { nome: pet.nome, imagem: novoCaminho };
                this.cria(pet, res);
            },
            /**
             * Função de erro
             */
            (erro) => {
                res.status(400).json({ 
                    resultados : 'Não foi possível fazer o upload do arquivo de imagem', 
                    erro 
                });
            } 
        );
    }

    /**
     * Insere um pet no BD
     * @param {*} pet 
     * @param {*} res 
     */
    cria(pet, res) {
        const validacao = new PetValidation(pet);         
        if(validacao.existemErros()) {
            res.status(400).json(validacao.listaErros());
        } else {
            const sql = `INSERT INTO Pets SET ?`;
            conexao.query(sql, pet, (erro, resultados) => {
                if(erro) {
                    console.log(erro);
                    /**
                     * 400: Bad request
                     */
                    res.status(400).json(erro);
                } else {
                    console.log('Pet adicionado com sucesso');
                    console.log(resultados);
                    console.log(pet);
                    /**
                     * 201: Created 
                     */    
                    res.status(201).json({...resultados, pet : pet});
                }
            });
        }        
    }

    /**
     * Lista todos os pets
     * @param {*} res 
     */
    lista(res) {
        const sql = `SELECT * FROM Pets`;

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
     * Mostra o pet com o id 
     * @param {*} id 
     * @param {*} res 
     */
    buscaPorId(id, res) {
        const sql = `SELECT * FROM Pets WHERE id=?`;

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                console.log(erro);
                /**
                 * 404: Not Found
                 */                
                res.status(404).json(erro);
            } else {
                const pet = resultados[0];
                res.status(200).json(pet);
            }
        });        
    }

    /**
     * Modifica um pet com o id 
     * @param {*} id 
     * @param {*} val 
     * @param {*} res 
     */
    altera(id, val, res) {
        let validacao = null;
        validacao = new PetValidation(val);
        if(validacao.existemErros()) {
            res.status(400).json(validacao.listaErros());
        } else {
            const sql = `UPDATE Pets SET ? WHERE id=?`;
            conexao.query(sql, [val, id], (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro);
                } else {
                    res.status(200).json({...resultados, pet : val});
                }
            });
        }
    }

    /**
     * Exclui o pet com o id
     * @param {*} id 
     * @param {*} res 
     */
    deleta(id, res) {
        const sql = 'DELETE FROM Pets WHERE id=?';

        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro);
            } else {
                res.status(200).json({...resultados, pet : {id} });
            }
        });
    }
}

module.exports = new Pet();