const express = require('express');
const app = express();
const morgan = require('morgan');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'noderestapi'
// });

app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('short'));

//
const router = require('./routes/user.js')

//
app.use(router);

//home ruta
app.get('/', (req, res) => {
  console.log('Home ruta');
  res.send('<h1>Vlada Sarac</h1>');
});

//ovde imamo pristup html fajlovima u public folderu(npr localhost:3000/form.html ce prikazati form.html iz public foldera)
app.use(express.static('./public'));




//server na port-u 3000
app.listen(3000, () => {
  console.log('Server is up and listening on Port 3000...');	
});


