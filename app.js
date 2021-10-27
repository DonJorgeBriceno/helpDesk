const express = require('express')
const app = express()

const db = require('./db')


app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(express.static(__dirname + '/public'));

const inc = require('./routes/incRouter')
app.use(inc)


app.get('/', (req, res)=>{
    res.render('logIn')
})

app.listen(3000, ()=>{
    console.log('¡Server UP! en http://localhost:3000')
})