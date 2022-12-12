const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
var path = require("path");

const app = express()
const port = process.env.PORT || 5000;
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 

app.use(express.static(path.join(__dirname, "..", "dist", "browser")));
app.use(
  "/",
  express.static(path.join(__dirname, "..", "dist", "browser", "index.html"))
);
app.listen(port, () => console.log(`Listening on port ${port}`))

const pool = mysql.createPool({
    connectionLimit  : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'nodejs'
})



//Get All node - API
app.get('/get-all-node', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from node', (err, rows) => {
            connection.release() // return the connection to pool

            // if (!err) {
            //     res.send(rows)
            // } else {
            //     console.log(err)
            // }

            // // if(err) throw err
            // console.log('The data from Node table are: \n', rows)
            if(err) throw err;
            res.send(rows);
        })
    })
})



//Get Single node ID - API
app.get('/get-single-node/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * FROM node WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            // if (!err) {
            //     res.send(rows)
            // } else {
            //     console.log(err)
            // }
            
            // console.log('The data from Node table are: \n', rows)
            if(err) throw err;
            res.send(rows);
        })
    })
});


//Delect Single node- API
app.delete('/delete-single-node/:id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM node WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool
            // if (!err) {
            //     res.send(`Node with the record ID ${[req.params.id]} has been removed.`)
            // } else {
            //     console.log(err)
            // }
            
            // console.log('The data from Node table are: \n', rows)
            if(err) throw err;
            res.send();
        })
    })
});


//Insert Single node - API
app.post('/insert-single-node', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO node SET ?', params, (err, rows) => {
        connection.release() // return the connection to pool
        // if (!err) {
        //     res.send(`Node with the record ID has been added.`)
        // } else {
        //     console.log(err)
        // }
        if(err) throw err;
        res.send();
        
        console.log('The data from Node table are:11 \n', rows)

        })
    })
});


//Update node with ID- API
app.put('/update-node-with-id', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id, name } = req.body

        connection.query('UPDATE node SET name = ? WHERE id = ?', [name, id] , (err, rows) => {
            connection.release() // return the connection to pool

            // if(!err) {
            //     res.send(`Node with the name: ${name} has been added.`)
            // } else {
            //     console.log(err)
            // }
            if(err) throw err;
            res.send();

        })
    })
})