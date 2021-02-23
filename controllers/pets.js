const pet = require('../models/pet');

/**
 * Rotas de Pets
 * @returns void
 */
module.exports = (app => {
    /** 
     * Rota que lista todos os pets 
     */
    app.get('/pets', (req, res) => { 
        pet.lista(res);
    });

    /** 
     * Rota que mostrar um pet em particular 
     */
    app.get('/pets/:id', (req, res) => { 
        const id = parseInt(req.params.id);
        pet.buscaPorId(id, res);
    });

    /** 
     * Rota que cria um novo pet 
     */
    app.post('/pets', (req, res) => { 
        pet.adiciona(req.body, res);
    });

    /** 
     * Rota que altera um pet em particular 
     */
    app.patch('/pets/:id', (req, res) => { 
        const id = parseInt(req.params.id);
        pet.altera(id, req.body, res);
    }); 
    
    /** 
     * Rota que exclui um pet em particular 
     */
    app.delete('/pets/:id', (req, res) => { 
        const id = parseInt(req.params.id);
        pet.deleta(id, res);
    });     
});

