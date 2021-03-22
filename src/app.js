const express = require('express')
const path = require('path')
const connection = require('./db/mysql')
const app = express()

const port = process.env.PORT||3000

const viewsPath = path.join(__dirname, '../templates/views')
const publicDirPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirPath))
app.use(express.json())

app.get('/', (req,res)=>{
    res.render('index', {test: 'test'})
})
app.get('/api/getTasks',(req,res)=>{
    connection.query('SELECT * FROM tasks where completed=0', (e,rows,field)=>{
        if (e){
            console.log(e)
        }else{
            res.send(rows)
        }
    })
})
app.get('/mainpage', (req,res)=>{
    res.render('mainpage', {title: 'Tasks'})
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})