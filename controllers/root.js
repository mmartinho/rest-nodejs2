/**
 * Rotas de root
 * @returns void
 */
module.exports = (app => {
    app.get('/', (req, res) => res.send('Acessando a rota raiz com o GET'));
});