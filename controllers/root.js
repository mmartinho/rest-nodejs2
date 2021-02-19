/**
 * Rotas de root
 * @returns void
 */
module.exports = (app => {
    app.get('/', (req, res) => { 
        console.log(req);
        res.send('Acessando a rota raiz com o GET'); 
    });
});