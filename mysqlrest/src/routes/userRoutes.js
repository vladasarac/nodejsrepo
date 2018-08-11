const User = require('../models/user'); //uvozimo model user.js
module.exports = function(app){
  
  //get /users ruta, vraca sve usere iz 'users' tabele tj poziva metod getUsers() iz modela users.js iz models foldera
  app.get('/users', (req, res) => {
  	User.getUsers((err, data) => {
      res.status(200).json(data);
  	});
  });	

  //post /users ruta za unos novog usera u 'users' tabelu, poziva metod insertUsers() iz modela users.js iz models foldera
  app.post('/users', (req, res) => {
  	console.log(req.body);
  	var userData = {
  	  id: null,
  	  username: req.body.username,
  	  email: req.body.email,
  	  password: req.body.password,
  	  created_at: null,
  	  updated_at: null	
  	};
  	User.insertUser(userData, (err, data) => {
  	  if(data && data.insertId){
  	  	res.status(200).json({
  	  	  success: true,
  	  	  msg: 'Inserted a new user', 
  	  	  data: data	
  	  	});
  	  }else{
  	  	res.status(500).json({
  	  		success: false,
  	  		msg: 'Error'
  	  	});
  	  }	
  	});
  });

  //put /users/id ruta za update usera, poziva metod updateUser() iz modela users.js iz models foldera
  app.put('/users/:id', (req, res) => {
    var userData = {
      id: req.params.id,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      created_at: null,
      updated_at: null  
    };
    User.updateUser(userData, function(err, data){
      if(data && data.msg){
        res.status(200).json({data});
      }else{
        res.status(500).json({success: false, msg: 'Error'});
      }
    });
  });

  //delete ruta /users/id za brisanje usera, poziva metod deleteUser() iz modela users.js iz models foldera
  app.delete('/users/:id', (req, res) => {
    var id = req.params.id;
    User.deleteUser(id, (err, data) => {
      if(data && data.msg === 'deleted' || data.msg === 'not Exists'){
        res.json({success: true, data});
      }else{
        res.status(500).json({msg: 'Error'});
      }
    });
  });

}


