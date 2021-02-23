const atendimento = require('../models/atendimento');
const axios = require('axios');

/**
 * Rotas de Atendimentos
 * @returns void
 */
module.exports = (app => {
    /** 
     * Rota que lista todos os atendimentos 
     */
    app.get('/atendimentos', (req, res) => { 
        atendimento.lista()
            .then(
                resultados => res.status(200).json(resultados)
            )
            .catch(
                erros => res.status(400).json(erros)
            );
    });

    /** 
     * Rota que mostrar um atendimento em particular 
     */
    app.get('/atendimentos/:id', (req, res) => { 
        const id = parseInt(req.params.id);
        atendimento.buscaPorId(id)
            .then(
                async (resultados, campos) => { 
                    const atendimento = resultados[0];
                    const cpf = atendimento.cliente;
                    const {data} = await axios.get(`http://localhost:8082/${cpf}`);
                    atendimento.cliente = data;
                    res.status(200).json(atendimento);                 
                }
            )
            .catch(
                erros => res.status(400).json(erros)
            );
    });

    /** 
     * Rota que cria um novo Atendimento 
     */
    app.post('/atendimentos', (req, res) => { 
       atendimento.adiciona(req.body)
            .then(
                atendimentoCadastrado => res.status(201).json(atendimentoCadastrado)
            )
            .catch(
                erros => res.status(400).json(erros)
            );
    });

    /** 
     * Rota que altera um atendimento em particular 
     */
    app.patch('/atendimentos/:id', (req, res) => { 
        const id = parseInt(req.params.id);
        atendimento.altera(id, req.body)
            .then(
                atendimentoAlterado => res.status(200).json(atendimentoAlterado)    
            )
            .catch(
                erros => res.status(400).json(erros)
            );
    }); 
    
    /** 
     * Rota que exclui um atendimento em particular 
     */
    app.delete('/atendimentos/:id', (req, res) => { 
        const id = parseInt(req.params.id);
        atendimento.deleta(id)
            .then(
                atendimentoExcluido => res.status(200).json(atendimentoExcluido)
            )
            .catch(
                erros => res.status(400).json(erros)
            );
    });     
});

