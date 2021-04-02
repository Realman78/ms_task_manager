const express = require('express')
const router = new express.Router
const connection = require('../db/mysql')

//Read iz databaže sve taskove koji nisu completeani te njihovo slanje (res.send) da se mogu koristit u frontendu
router.get('/tasks/getall',(req,res)=>{
    connection.query('SELECT * FROM tasks where completed=0', (e,rows,field)=>{
        if (e){
            console.log(e)
        }else{
            res.send(rows)
        }
    })
})
//DOdavanje novog taska, možes poslat sta god oces ja sam bzvz stavio Success
router.post('/tasks/add', (req,res)=>{
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

router.patch('/tasks/update/:id', (req,res)=>{
    const description = req.body.description
    const sql = `UPDATE tasks SET description=? WHERE id=${req.params.id}`
    connection.query(sql, [description], (e,rows,field)=>{
        if (e){
            console.log(e)
        }else{
            res.send('Success')
        }
    })
})
module.exports = router