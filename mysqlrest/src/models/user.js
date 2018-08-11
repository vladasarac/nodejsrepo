const mysql = require('mysql');

connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root',
  password: '',
  database: 'testapimysql'
});

let userModel = {};

//metod vadi usere iz 'users' tabele baze 'testapimysql'
userModel.getUsers = (callback) => {
  if(connection){
  	connection.query('SELECT * FROM users ORDER BY id', (err, rows) => {
  	  if(err){
  	  	throw err;
  	  }	else{
  	  	callback(null, rows);
  	  }
  	});
  }
};

//metod za insert usera u 'users' tabelu baze 'testapimysql'
userModel.insertUser = (userData, callback) => {
  if(connection){
  	connection.query('INSERT INTO users SET ?', userData, (err, result) => {
  	  if(err){
  	  	throw err;
  	  }else{
  	  	callback(null, {'insertId': result.insertId})
  	  }
  	});
  }	
};

//metod za update usera u 'users' tabeli baze 'testapimysql'
userModel.updateUser = (userData, callback) => {
  if(connection){
    const sql = `UPDATE users SET  
      username = ${connection.escape(userData.username)},
      password = ${connection.escape(userData.password)},
      email = ${connection.escape(userData.email)} 
      WHERE id = ${userData.id}`;
    connection.query(sql, function(err, result){
      if(err){
        throw err;
      }else{
        callback(null, {'msg': "success"});
      }
    });
  }
};

//metod za brisanje usera iz 'users' tabele baze 'testapimysql'
userModel.deleteUser = (id, callback) => {
  if(connection){
    let sqlExists = `SELECT * FROM users WHERE  id = ` + connection.escape(id);
    connection.query(sqlExists, (err, row, fields) => {
      if(row.length != 0){
        console.log(row);
        let sql = `DELETE FROM users WHERE id = ` + connection.escape(id);
        connection.query(sql, (err, result) => {
          if(err){
            throw err;
          }else{
            callback(null, {'msg': "deleted"});
          }
        });
      }else{ 
        console.log('nema tog usera');
        callback(null, {'msg': "not Exists"});
      }
    });
  }
};


//izvozimo
module.exports = userModel;


