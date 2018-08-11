var greet = require('./greeter')

greet('ema');

var user = require('./export_object')

console.log(user.name);
console.log(user.getFullName())

//rad sa fajlovima
const fs = require('fs')
//pisanje u fajl
var data = 'bla bla 2 smrad ovo ono'
fs.writeFile('./tekst.txt', data, (err) => {
	//dfsaf
})

//pracenje tj watch foldera
const watcher = fs.watch('./proba')
watcher.on('change', (event, filename) => {
  console.log(`${event} on file ${filename}`)	
})

