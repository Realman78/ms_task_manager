const express = require('express')
const router = new express.Router
const Task = require('../../schemas/Task')

//Read iz databaze sve taskove koji nisu completeani te njihovo slanje (res.send) da se mogu koristit u frontendu
router.get('/tasks/getall',async (req,res)=>{
    const tasks = await Task.find({completed: false}).catch(e=> console.log(e))
    res.send(tasks)
})
//DOdavanje novog taska, možes poslat sta god oces ja sam bzvz stavio Success
router.post('/tasks/add', async (req,res)=>{
    if (!req.body.description || !req.body.user){
        return res.sendStatus(400)
    }
    const body = {
        description: req.body.description,
        user: req.body.user._id,
        completed: false,
    }
    const task = await Task.create().catch(e=>console.log(e))
    res.send(task)
    // console.log(req.body)
    // connection.query("INSERT INTO tasks(description, user) VALUES(?,?)", [req.body.description, req.body.user], 
    // (e,rows,field)=>{
    //     if (e){
    //         console.log(e)
    //     }else{
    //         res.send('Success')
    //     }
    // })
})

router.patch('/tasks/update/:id', (req,res)=>{
    // const description = req.body.description
    // const sql = `UPDATE tasks SET description=? WHERE id=${req.params.id}`
    // connection.query(sql, [description], (e,rows,field)=>{
    //     if (e){
    //         console.log(e)
    //     }else{
    //         res.send('Success')
    //     }
    // })
})
module.exports = router