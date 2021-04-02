//importi
const express = require('express')
const path = require('path')
const connection = require('./db/mysql')
const app = express()
const usersRouter = require('./routers/users')
const tasksRouter = require('./routers/tasks')
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
app.use(usersRouter)
app.use(tasksRouter)

//Kad radim request na / odnosno index, prikazi mi index (onda on zbog app.set('views', viewsPath) 
//trazi hbs file koji se zove index i to prikazuje)
app.get('/', (req,res)=>{
    res.redirect('/register')
})

//Renderanje main page-a
app.get('/mainpage', (req,res)=>{
    console.log(getCookie(req.headers.cookie, 'ms_tm_token'))
    res.render('mainpage', {title: 'Tasks'})
})

//Renderanje login page-a
app.get('/login', (req,res)=>{
    res.render('login')
})

//Renderanje register page-a
app.get('/register', (req,res)=>{
    res.render('register')
})

//Express server sluša port 3000 zasad jer nismo hostani
app.listen(port, ()=>{
    console.log(`Server is up and running on port ${port}`)
})

function getCookie(cookies, cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(cookies);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkIfLoggedIn(){
    
}