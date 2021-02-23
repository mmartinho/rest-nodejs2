const fs = require('fs');

/**
 * Cria um evento de leitura de arquivo
 */
fs.createReadStream('./assets/maggie.jpg')
    /**
     * Pega o resultado do evento anterior e cria um evento 
     * escrita de arquivo
     */
    .pipe(fs.createWriteStream('./assets/maggie-stream.jpg'))
    /**
     * Observe o evento 'finish' e apresente a mensagem
     */
    .on('finish', () => {
        console.log('Imagem escrita com sucesso');
    });