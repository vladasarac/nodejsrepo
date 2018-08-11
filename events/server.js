// console.log('bla bla');

var express = require('express');
var http = require('http');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');

//
app.use(bodyParser.urlencoded({ extended: true }));
//paket za formatiranje datuma
var dateFormat = require('dateformat');
var now = new Date();
//engine ejs za vjuove
app.set('view engine', 'ejs');
//bootstrap, jqury i slicno
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/tether/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//mysql connection
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'eventsdatabase'	
});

//globalne variable za podesavanje siteTitle-a i baseUrl-a
const siteTitle = "Simple Events Application";
const baseURL = "http://localhost:4000/"; 

//ruta ka homepage-u, vadi sve iz tabele e_events u bazi i salje to(result) i siteTitle i pageTitle u index.ejs vju 
app.get('/', function(req, res){	
  con.query("SELECT * FROM e_events ORDER BY e_start_date DESC", function(err, result){
    console.log(result);
    res.render('pages/index', {
      siteTitle: siteTitle, 
      pageTitle: "Events List",
      items: result	
    });
  });	
});

//ruta /event/add (GET) ka vjuu add-event.ejs iz 'views/pages' za dodavanje eventa
app.get('/event/add', function(req, res){
  res.render('pages/add-event.ejs', {
  	siteTitle: siteTitle,
  	pageTitle: "Add New Event",
  	items: ''
  });
});

//ruta /event/add (POST) koja upisuje novi event u tabelu e_events u bazi kad se sabmituje forma u vjuu add-event.ejs iz 'views/pages' 
app.post('/event/add', function(req, res){
  var query = "INSERT INTO e_events (e_name, e_start_date, e_end_date,  e_date_added, e_date_modified, e_desc, e_location) VALUES (";
  query += " '"+req.body.e_name+"',";
  query += " '"+dateFormat(req.body.e_start_date,"yyyy-mm-dd")+"',";
  query += " '"+dateFormat(req.body.e_end_date,"yyyy-mm-dd")+"',";
  query += " '"+dateFormat(now,"yyyy-mm-dd")+"',";
  query += " '"+dateFormat(now,"yyyy-mm-dd")+"',";
  query += " '"+req.body.e_desc+"',";
  query += " '"+req.body.e_location+"')";	
  con.query(query, function(err, result){
  	res.redirect(baseURL);
  });
});

//edit eventa, get ruta koja vadi event za editovanje iz e_events tabele i salje ga u vju edit-event.ejs iz 'views\pages'
app.get('/event/edit/:id', function(req, res){
  con.query("SELECT * FROM e_events WHERE e_id = '" + req.params.id + "'", function(err, result){
    result[0].e_start_date = dateFormat(result[0].e_start_date, "yyyy-mm-dd");
    result[0].e_end_date = dateFormat(result[0].e_end_date, "yyyy-mm-dd");
    res.render('pages/edit-event', {
      siteTitle: siteTitle,
      pageTitle: "Editing Event: " + result[0].e_name,
      item: result
    });
  });
});

//POST ruta za edit event akad se u edit-event.ejs sabmituje forma
app.post('/event/edit/:id', function(req, res){
  var query = "UPDATE `e_events` SET ";
  // query += "`e_name` = '" + req.body.e_name + "', ";
  // query += "`e_start_date` = '" + req.body.e_start_date + "', ";
  // query += "`e_end_date` = '" + req.body.e_end_date + "', ";
  // query += "`e_desc` = '" + req.body.e_desc + "', ";
  // query += "`e_location` = '" + req.body.e_location + "' ";
  // query += " WHERE `e_events`.`e_id` = " + req.body.e_id+"";
  query += " e_name = '" + req.body.e_name + "', ";
  query += " e_start_date = '" + req.body.e_start_date + "', ";
  query += " e_end_date = '" + req.body.e_end_date + "', ";
  query += " e_desc = '" + req.body.e_desc + "', ";
  query += " e_location = '" + req.body.e_location + "' ";
  query += " WHERE e_id = " + req.body.e_id+"";
  con.query(query, function(err, result){
    if(result.affectedRows){
      res.redirect(baseURL);
    }
  });
}); 

//ruta za brisanje eventa, kad se klikne link Delete u index.ejs iz views/pages
app.get('/event/delete/:id', function(req, res){
  con.query("DELETE FROM e_events WHERE e_id = '" + req.params.id + "'", function(err, result){
    if(result.affectedRows){
      res.redirect(baseURL);
    }
  });
});



//server (port 4000)
var server = app.listen(4000, function(){
  console.log("Server started on port 4000...");	
});




