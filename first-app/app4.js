//uvozimo node-ov built in klasu event za emitovanje eventa(dokumentacija - https://nodejs.org/dist/latest-v8.x/docs/api/events.html)
// const EventEmitter = require('events');

const Logger = require('./logger4');
const logger = new Logger();

//pravimo tj registrujemo listener za event messageLogged koji je ispod napravljen, kad se desi event messageLogged console.log-ujemo -
//'Listener called', listener za event mora biti napisan pre emitovanja eventa, u callbacku mozemo i stampati argumente koji su dati pri emi-
//tovanju eventa tj argumente koje smo napisali kao drugi parametar emit metoda
logger.on('messageLogged', function(arg){
	console.log('Listener called', arg.id, arg.url);
});

//pozivamo log metod klase Logger koja je u modulu logger4.js
logger.log('message');


