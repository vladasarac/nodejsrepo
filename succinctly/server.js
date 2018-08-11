const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')	
})

app.get('/users', (req, res) => {
  const users = [{id: 1, name: 'Vlada'}, {id: 2, name: 'Sima'}]
  res.send(users)	
})

app.listen(8000, () => {
	console.log('Example App listening on port 8000!')
})

