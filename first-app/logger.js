
var url = 'http://mylogger.io/log'; //izmisljeni url

function log(message){
	console.log(message);
}

//ovde exportujemo log() metod tako da ce biti vidljiv i u drugim modulima(fajlovima) aplikacije
module.exports.log = log;
//ovde exportujemo variablu url(dajemo joj drugo ime - endPoint)
module.exports.endPoint = url;



