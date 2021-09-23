const express = require('express')
const router = new express.Router

router.get('/users/getUsers', (req,res)=>{
    // connection.query("SELECT * FROM users", (e,rows,field)=>{
    //     if (e){
    //         console.log(e)
    //     }else{
    //         res.send(rows)
    //     }
    // })
})

router.get('/users/getUsers/token', (req,res)=>{
    // connection.query(`SELECT * FROM users WHERE ms_tm_token='${getCookie(req.headers.cookie, 'ms_tm_token')}'`, (e,rows,field)=>{
    //     if (e){
    //         console.log(e)
    //     }else{
    //         res.send(rows)
    //     }
    // })
})

router.post('/users/register', (req,res)=>{
    // connection.query("INSERT INTO users(username, email, password) VALUES(?,?,?);",
    // [req.body.username, req.body.email, req.body.password], (e,rows,fields)=>{
    //     if (e){
    //         console.log(e)
    //     }else{
    //         res.status(201).send()
    //     }
    // })
})

router.post('/users/login', (req,res)=>{
    // let keyword = req.body.uoe
    // keyword = validateEmail(keyword) ? 'email' : 'username'
    // connection.query(`SELECT id,username,password FROM users WHERE ${keyword}=?`, [req.body.uoe], (e, rows, field)=>{
    //     if (e){
    //         console.log(e)
    //     }else{
    //         if(rows[0].password == req.body.password)
    //             res.status(201).send(rows[0])
    //         else{
    //             res.status(401).send()
    //         }
    //     }
    // })
})

router.patch('/users/updateToken/:id', (req,res)=>{
    // const token = req.body.token
    // const sql = `UPDATE users SET ms_tm_token=? WHERE id=${req.params.id}`
    // connection.query(sql, [token], (e,rows,field)=>{
    //     if (e){
    //         console.log(e)
    //     }else{
    //         res.send('Success')
    //     }
    // })
})

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

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

module.exports = router