//importi
const express = require('express')
const path = require('path')
const connection = require('./db/mysql')
const app = express()
//Ovo je samo da kad hostamo na heroku, da ne koristi port 3000 nego herokuov predvideni
const port = process.env.PORT||3000

//path do direktorija views za html i public za css i js
const viewsPath = path.join(__dirname, '../templates/views')
const publicDirPath = path.join(__dirname, '../public')

//Kazem compileru da kao view engine ne koristi html nego hbs
app.set('view engine', 'hbs')
app.set('views', viewsPath)

//ignoriraj
app.use(express.static(publicDirPath))
app.use(express.json())

//Kad radim request na / odnosno index, prikazi mi index (onda on zbog app.set('views', viewsPath) 
//trazi hbs file koji se zove index i to prikazuje)
app.get('/', (req,res)=>{
    res.render('index', {test: 'test'})
})

//Read iz databaže sve taskove koji nisu completeani te njihovo slanje (res.send) da se mogu koristit u frontendu
app.get('/api/getTasks',(req,res)=>{
    connection.query('SELECT * FROM tasks where completed=0', (e,rows,field)=>{
        if (e){
            console.log(e)
        }else{
            res.send(rows)
        }
    })
})
//DOdavanje novog taska, možes poslat sta god oces ja sam bzvz stavio Success
app.post('/api/addTask', (req,res)=>{
    console.log(req.body)
    connection.query("INSERT INTO tasks(description, user) VALUES(?,?)", [req.body.description, req.body.user], 
    (e,rows,field)=>{
        if (e){
            console.log(e)
        }else{
            res.send('Success')
        }
    })
})
//Renderanje main page-a
app.get('/mainpage', (req,res)=>{
    res.render('mainpage', {title: 'Tasks'})
})

//Express server sluša port 3000 zasad jer nismo hostani
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})