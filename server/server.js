const express = require('express')
const app = express()

app.get('/api/test', function (req, res) {
    res.send('Hello World')
    console.log("访问成功");
})

app.listen(3000)

console.log('Listening at http://localhost:3000' + '\n')


