console.log(__filename);
console.log(__dirname);
var url = 'http://mylogger.io/log'; //izmisljeni url

function log(message){
	console.log(message);
}

//ovde exportujemo log() metod sam bez objekta
module.exports = log;