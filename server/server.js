const express = require('express')
const app = express()

const home = require('./routes/home');
// app.get('/api/test', function (req, res) {
//     res.send('Hello World')
//     console.log("访问成功");
// })

app.use('/api/home', home);

app.listen(3000)

console.log('Listening at http://localhost:3000' + '\n')


