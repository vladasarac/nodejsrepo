//uvozimo node-ov built in klasu event za emitovanje eventa(dokumentacija - https://nodejs.org/dist/latest-v8.x/docs/api/events.html)
const EventEmitter = require('events');

//pravimo objekat emitter klase events tj EventEmitter(posto smo je ovde uvezli u constantu tog imena)
const emitter = new EventEmitter();

//pravimo tj registrujemo listener za event messageLogged koji je ispod napravljen, kad se desi event messageLogged console.log-ujemo -
//'Listener called', listener za event mora biti napisan pre emitovanja eventa, u callbacku mozemo i stampati argumente koji su dati pri emi-
//tovanju eventa tj argumente koje smo napisali kao drugi parametar emit metoda
emitter.on('messageLogged', function(arg){
	console.log('Listener called', arg.id, arg.url);
});

//pravimo event koji emituje 'messageLogged', kao drugi parametar ubacujemo objegat sa argumentima
emitter.emit('messageLogged', {id: 1, url: 'http://youtube.com'});



