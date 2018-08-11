const express = require('express');
const mysql = require('mysql');

//mysql connection credentials
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql'	
});
//Connect
db.connect((err) => {
  if(err){
  	throw err;
  }	
  console.log('Mysql Connected...');
});

const app = express();

//create database route
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE nodemysql'; //query koji pravi bazu 'nodemysql'
  //funkcija koja ce da odradi query definisan u sql
  db.query(sql, (err,result) => {
  	if(err){
  	  throw err;	
  	} 
  	console.log(result);
  	res.send('Database created...');
  });
});

//create table route
app.get('/createpoststable', (req, res) => {
  let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
  //funkcija koja ce da odradi query definisan u sql
  db.query(sql, (err,result) => {
  	if(err){
  	  throw err;	
  	} 
  	console.log(result);
  	res.send('Posts table created...');
  });	
});

//insert post no1 into posts table route
app.get('/addpost1', (req, res) => {
  let post = {title: 'Post one', body: 'This is post number one!'};
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err , result) => {
    if(err){
  	  throw err;	
  	} 
  	console.log(result);
  	res.send('Post one added...');
  });
});
//insert post no2 into posts table route
app.get('/addpost2', (req, res) => {
  let post = {title: 'Post Two', body: 'This is post number two!'};
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err , result) => {
    if(err){
  	  throw err;	
  	} 
  	console.log(result);
  	res.send('Post two added...');
  });
});

//select all posts from posts table
app.get('/getposts', (req, res) => {
  let sql = 'SELECT * FROM posts';
  let query = db.query(sql, (err , results) => {
    if(err){
  	  throw err;	
  	} 
  	console.log(results);
  	res.send('Posts feched...');
  });
});

//select single post from posts table
app.get('/getpost/:id', (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err , result) => {
    if(err){
  	  throw err;	
  	} 
  	console.log(result);
  	res.send('Post feched...');
  });
});

//update post route
app.get('/updatepost/:id', (req, res) => {
	let newTitle = 'Updated title';
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err , result) => {
    if(err){
  	  throw err;	
  	} 
  	console.log(result);
  	res.send('Post updated...');
  });
});

//Delete post route
app.get('/deletepost/:id', (req, res) => {
	let newTitle = 'Updated title';
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err , result) => {
    if(err){
  	  throw err;	
  	} 
  	console.log(result);
  	res.send('Post deleted...');
  });
});


app.listen('3000', () => {
  console.log('Server started on port 3000');
});



