const express = require("express");
var pool = require('../connection/mysql.js');
const apiRoute = express.Router();
const userMiddleware = require("../middleware/userRoute.js");


//Get All nodes - API
apiRoute.get('/get-all-node', userMiddleware.isLoggedIn, (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from node', (err, rows) => {
            connection.release()
            if(err) throw err;
            res.send(rows);
        })
    })
})

//Get All nodes - API
apiRoute.get('/get-all-node', userMiddleware.isLoggedIn, (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from node', (err, rows) => {
            connection.release()
            if(err) throw err;
            res.send(rows);
        })
    })
})



//Get Single node ID - API
apiRoute.get('/get-single-node/:id', userMiddleware.isLoggedIn, (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * FROM node WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release()
            if(err) throw err;
            res.send(rows);
        })
    })
});


//Delect Single node- API
apiRoute.delete('/delete-single-node/:id', userMiddleware.isLoggedIn, (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM node WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release()
            if(err) throw err;
            res.send();
        })
    })
});


//Insert Single node - API
apiRoute.post('/insert-single-node', userMiddleware.isLoggedIn, (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        
        const params = req.body
        connection.query('INSERT INTO node SET ?', params, (err, rows) => {
        connection.release() 
        if(err) throw err;
        res.send();
        
        console.log('The data from Node table are:11 \n', rows)

        })
    })
});


//Update node with ID- API
apiRoute.put('/update-node-with-id', userMiddleware.isLoggedIn, (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id, name } = req.body

        connection.query('UPDATE node SET name = ? WHERE id = ?', [name, id] , (err, rows) => {
            connection.release() 
            if(err) throw err;
            res.send();

        })
    })
})
module.exports = apiRoute;