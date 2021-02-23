const EventEmmitter = require('events');

class MyEmmiter extends EventEmmitter {}

const myEmitter = new MyEmmiter();

/**
 * Faz só uma vez, pra não entrar em loop eterno
 */
myEmitter.once('newListener', (event, listener)=> {
    if(event === 'evento') {
        /**
         * Insere um novo ouvinte na frente
         */
        myEmitter.on('evento', () => {console.log('evento foi ouvido na frente A');});
    }
});

myEmitter.on('evento', () => console.log('evento foi ouvido B'));

/** 
 * Evento emitido
 */
myEmitter.emit('evento');