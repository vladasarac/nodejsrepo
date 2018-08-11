const Joi = require('joi'); //Joi je paket za validaciju
//uvozimo paket express
const express = require('express');
//pozivamo metod express() koji vraca objekat tipa express
const app = express();
//
app.use(express.json());
//array imitira bazu u njemu su kursevi tj njihovi idevi i nazivi
const courses = [
	{id: 1, name: 'course1'}, 
	{id: 2, name: 'course2'},
	{id: 3, name: 'course3'},
];

//home ruta
app.get('/', function(req, res){
	res.send('<h1 style="color: green">Hello World</h1><br><a href="http://localhost:3000/api/courses"><h3 style="color: blue;">Courses</h3></a>');
});
//ruta ka api/courses koja prikazuje sve kurseve
app.get('/api/courses', function(req, res){
	res.send(courses);
});
//dodavanje novog kursa u array corses
app.post('/api/courses', (req, res) => {
	//pozivamo funkciju valdateCourse za validaciju
	const result = validateCourse(req.body);
	//ako ima validacionih gresaka saljemo ih na prikaz klijentu
	if(result.error){
		res.status(400).send(result.error.details[0].message);
		return;
	}
	//ako prodje validacija, u array courses ubacujemo novi kurs kao novi element i dajemo mu id duzina arraya + 1 a name je userov unos
	const course = {
		id:  courses.length + 1,
		name:  req.body.name
	};
	courses.push(course);
	// res.send(course);
	res.send(courses);
});
//update cours-a
app.put('/api/courses/:id', (req, res) => {
	//nalazimo kurs u courses arrayu
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if(!course){
		res.status(404).send('The course with the given ID was not found');
		return;
	}
	//pozivamo funkciju valdateCourse za validaciju
	const result = validateCourse(req.body);
	//ako ima validacionih gresaka saljemo ih na prikaz klijentu
	if(result.error){		
		res.status(400).send(result.error.details[0].message);
		return;
	}
	course.name = req.body.name;
	res.send(courses);
});
//ruta vadi jedan kurs (function(res, req) se moze napisati i ovako (req, res) => {})
app.get('/api/courses/:id', (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if(!course){
		res.status(404).send('The course with the given ID was not found');
		return;
	}
	res.send(course);
});
//brisanje course-a, tj nekog elementa array-a courses
app.delete('/api/courses/:id', (req, res) => {
	//nalazimo kurs za brisanje u courses arrayu
	const course = courses.find(c => c.id === parseInt(req.params.id));
	if(!course){
		res.status(404).send('The course with the given ID was not found');
		return;
	}
	//nalazimo index za brisanje course-a u courses arrayu
	const index = courses.indexOf(course);
	//izbacujemo ga iz arraya courses
	courses.splice(index, 1);
	res.send(courses);
});


//funkcija za validaciju
function validateCourse(course){
	//Joi validacija, u requestu mora biti name i vrednost mora imati bar 3 karaktera
	const schema = {
		name: Joi.string().min(3).required()
	};
	return Joi.validate(course, schema);
} 


//PORT (slusaj na env variabli port ako je podesena ili na portu 3000 ako nije podesena)
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

