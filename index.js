/**
 * Configuração do servidor de aplicação
 */
const customExpress = require('./config/customExpress');
/**
 * Tenta conexão com o BD
 */
const conexao = require('./infra/database/connection');
conexao.connect(erro => { 
    if(erro) {
        console.log(erro);
    } else {
        console.log('Conectado no banco de dados com sucesso');
        
        /**
         * Removido para usar "migrations"
         * tables.init(conexao);
         */

        /**
         * Inicia o servidor de aplicação
         */ 
        const app = customExpress();
        app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
    }
});