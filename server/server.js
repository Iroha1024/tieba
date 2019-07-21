const express = require('express')
const app = express()

const home = require('./routes/home');
const public = require('./routes/public');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/public', public);
app.use('/api/home', home);

app.listen(3000)

console.log('Listening at http://localhost:3000' + '\n')


