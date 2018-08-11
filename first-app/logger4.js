//uvozimo node-ov built in klasu event za emitovanje eventa(dokumentacija - https://nodejs.org/dist/latest-v8.x/docs/api/events.html)
const EventEmitter = require('events');

class Logger extends EventEmitter {
	log(message){
		console.log(message);
		//pravimo event koji emituje 'messageLogged', kao drugi parametar ubacujemo objegat sa argumentima
		this.emit('messageLogged', {id: 1, url: 'http://youtube.com'});
	}	
}

//ovde exportujemo Logger klasu
module.exports = Logger;









































