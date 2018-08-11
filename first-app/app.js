//

// function sayHello(name){
// 	console.log('Hello ' + name);
// }

// sayHello('Vlada');

// var message = '';
// console.log(global.message);

// console.log(module);

//requirujemo logger.js i ubacujemo u variablu(tj const) logger i sada ako npr hocemo da console.logujemo variablu url iz logger.js tj endPoint kucamo -
//console.log(logger.endPoint);
const logger = require('./logger.js');
// console.log(logger.endPoint);
//ovde pozivamo metod log() iz logger.js modula
logger.log('Jedi Govna');


