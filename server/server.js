const express = require('express')
const app = express()

const home = require('./routes/home');

app.use('/api/home', home);

app.listen(3000)

console.log('Listening at http://localhost:3000' + '\n')


