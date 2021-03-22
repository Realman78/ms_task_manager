const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ms_tm_db'
})

connection.connect((e)=>{
    if (e){
        console.log(e)
    }else{
        console.log('Connected')
    }
})

module.exports = connection