const express = require('express');
const consign = require('consign/lib/consign');
const bodyParser = require('body-parser');

/**
 * Configuração do Servidor Express
 * @returns any
 */
module.exports = ( () => {
    const app = express();
    
    /**
     * Propriedade "função" do Express que insere a lib "bodyParser"
     * para traduzir dados em formato de "formulário"
     */
    app.use(bodyParser.urlencoded({extended: true}));
    
    /**
     * Propriedade "função" do Express que insere a lib "bodyParser"
     * para traduzir dados em formato "json"
     */
    app.use(bodyParser.json());
    
    /**
     * Lib consign incluindo todo o diretório "controllers" 
     * na app Express 
     */
    consign().include('controllers').into(app);

    return app;
});

