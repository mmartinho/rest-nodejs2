const atendimento = require('../models/atendimento');

/**
 * Rotas de Atendimentos
 * @returns void
 */
module.exports = (app => {
    /** 
     * Rota que lista todos os atendimentos 
     */
    app.get('/atendimentos', (req, res) => { 
        atendimento.lista(res);
    });

    /** 
     * Rota que mostrar um atendimento em particular 
     */
    app.get('/atendimentos/:id', (req, res) => { 
        const id = parseInt(req.params.id);
        atendimento.buscaPorId(id, res);
    });

    /** 
     * Rota que cria um novo Atendimento 
     */
    app.post('/atendimentos', (req, res) => { 
       atendimento.adiciona(req.body, res);
    });

    /** 
     * Rota que altera um atendimento em particular 
     */
    app.patch('/atendimentos/:id', (req, res) => { 
        const id = parseInt(req.params.id);
        atendimento.altera(id, req.body, res);
    }); 
    
    /** 
     * Rota que exclui um atendimento em particular 
     */
    app.delete('/atendimentos/:id', (req, res) => { 
        const id = parseInt(req.params.id);
        atendimento.deleta(id, res);
    });     
});

