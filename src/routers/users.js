const express = require('express')
const router = new express.Router
const connection = require('../db/mysql')

router.get('/users/getUsers', (req,res)=>{
    connection.query("SELECT * FROM users", (e,rows,field)=>{
        if (e){
            console.log(e)
        }else{
            res.send(rows)
        }
    })
})

router.post('/users/register', (req,res)=>{
    connection.query("INSERT INTO users(username, email, password) VALUES(?,?,?);",
    [req.body.username, req.body.email, req.body.password], (e,rows,fields)=>{
        if (e){
            console.log(e)
        }else{
            res.status(201).send()
        }
    })
})

router.post('/users/login', (req,res)=>{
    let keyword = req.body.uoe
    keyword = validateEmail(keyword) ? 'email' : 'username'
    connection.query(`SELECT username,password FROM users WHERE ${keyword}=?`, [req.body.uoe], (e, rows, field)=>{
        if (e){
            console.log(e)
        }else{
            if(rows[0].password == req.body.password)
                res.status(201).send()
            else{
                res.status(401).send()
            }
        }
    })
})

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = router