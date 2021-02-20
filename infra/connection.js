const mysql = require('mysql');

const conexao = mysql.createConnection({
    host:'localhost',
    port: 3306,
    user: 'alura.agenda.petshop',
    password : '123456',
    database: 'alura_agenda_petshop2'
});

module.exports = conexao;