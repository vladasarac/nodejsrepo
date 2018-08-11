
//uvozimo node-ov built in modul path(dokumentacija - https://nodejs.org/dist/latest-v8.x/docs/api/path.html)

const path = require('path');

//koristimo metod parse path objekta na __filename varijabli modula
var pathObj = path.parse(__filename);

//ovde stampamo
console.log(pathObj);

//uvozimo node-ov built in modul os(dokumentacija - https://nodejs.org/dist/latest-v8.x/docs/api/os.html)
const os = require('os');
//pomocu ovog metoda dobijamo kolicinu memorije masine na kojoj se radi
var totalMemory = os.totalmem();
//pomocu ovog metoda os objekta dobijamo kolicinu slobodne memorije masine
var freeMemory = os.freemem();

// console.log('Total Memory: ' + totalMemory);
//novi nacin konkatenacije u JS-u
console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);



































