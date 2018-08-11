//uvozimo node-ov built in modul fs, za rad sa fajlovima(dokumentacija - https://nodejs.org/dist/latest-v8.x/docs/api/fs.html)
const fs = require('fs');

//u const array files ubacujemo imena svih podfoldera i fajlova u folderu u kom je ovaj fajl (ovo je Synchronous verzija)
// const files = fs.readdirSync('./');

// console.log(files);

//ovo je Asynchronous verzija
fs.readdir('./', function(err, files){
	if(err) console.log('Error', err);
	else console.log('Result', files);
});













