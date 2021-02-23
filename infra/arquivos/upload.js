const fs = require('fs');

module.exports = (arquivoImagem, callbackImagemCriada, callbackErro) => {
    const sourceFilePath = `./assets/${arquivoImagem}`;
    const uploadedFilePath = `./uploaded/${arquivoImagem}`;
    /**
     * Pega o status do arquivo fonte
     */
    fs.stat(sourceFilePath, (erro, stats) => {
        /**
         * Falha no status do arquivo... 
         */
        if(erro) {
           /**
            * Chame a função de erro  
            */ 
           callbackErro(erro); 
        } else {
            /**
             * Leitura do arquivo fonte
             */
            fs.createReadStream(sourceFilePath)
                /** 
                 * Escreve o resultado da leitura no arquivo destino  
                 */
                .pipe(fs.createWriteStream(uploadedFilePath))
                /**
                 * Ao finalizar, chame a função de sucesso
                 */
                .on('finish', () => callbackImagemCriada(uploadedFilePath));          
        }
    });
}