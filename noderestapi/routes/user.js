//all users related routes
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
//pool konekcija sa bazom
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'noderestapi'
});
function getConnection(){
  return pool;	
}

//konekcija sa bazom
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'noderestapi'
// });
//
router.get('/messages', (req, res) => {
  console.log('messages ruta, show some messages');
  res.end();
});

//vadi sve usere iz users tabele
router.get('/users', (req, res) => {
  getConnection().query("SELECT * FROM users", (err, rows, fields) => {
  	res.json(rows);
  });
});

//jedan user
router.get('/user/:id', (req, res) => {
  const query = "SELECT * FROM users WHERE id = ?";	
  getConnection().query(query, [req.params.id], (err, rows, fields) => {
  	//ako imamo error u query-u
  	if(err){
  	  console.log('You have error in your query: ' + err);	
  	  res.sendStatus(500);
  	  return;
  	}
  	res.json(rows);
  });
});

//kad se sabmituje forma u form.html za dodavanje novog usera
router.post('/user_create', (req, res) => {
  console.log('trying to create a new user...');
  //koristimo bodyParser
  // console.log('First name: ' + req.body.create_first_name);
  // console.log('Last name: ' + req.body.create_last_name);
  const firstName = req.body.create_first_name;
  const lastName = req.body.create_last_name;
  //upis u bazu unosa u formu
  const querystring = "INSERT INTO users (first_name, last_name) VALUES (?, ?)";
  getConnection().query(querystring, [firstName, lastName], (err, results, fields) => {
  	if(err){
  	  console.log('Faild to insert new user: ' + err);	
  	  res.sendStatus(500);
  	  return;
  	}
  	console.log('Inserted a new user with id: ' + results.insertId);
  });
  res.end();		
});

module.exports = router;






