const express = require("express");
var pool = require('../connection/mysql.js');
const apiRoute = express.Router();
const userMiddleware = require("../middleware/userRoute.js");


//Get All nodes - API
// apiRoute.get('/get-all-node', userMiddleware.isLoggedIn, (req, res) => {
//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         console.log('connected as id ' + connection.threadId)
//         connection.query('SELECT * from node', (err, rows) => {
//             connection.release()
//             if(err) throw err;
//             res.send(rows);
//         })
//     })
// })

// //Get All nodes - API
// apiRoute.get('/get-all-node', userMiddleware.isLoggedIn, (req, res) => {
//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         console.log('connected as id ' + connection.threadId)
//         connection.query('SELECT * from node', (err, rows) => {
//             connection.release()
//             if(err) throw err;
//             res.send(rows);
//         })
//     })
// })



//Get Single node ID - API
// apiRoute.get('/get-single-node/:id', userMiddleware.isLoggedIn, (req, res) => {
//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         connection.query('SELECT * FROM node WHERE id = ?', [req.params.id], (err, rows) => {
//             connection.release()
//             if(err) throw err;
//             res.send(rows);
//         })
//     })
// });


//Delect Single node- API
// apiRoute.delete('/delete-single-node/:id', userMiddleware.isLoggedIn, (req, res) => {

//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         connection.query('DELETE FROM node WHERE id = ?', [req.params.id], (err, rows) => {
//             connection.release()
//             if(err) throw err;
//             res.send();
//         })
//     })
// });


//Insert Single node - API
// apiRoute.post('/insert-single-node', userMiddleware.isLoggedIn, (req, res) => {

//     pool.getConnection((err, connection) => {
//         if(err) throw err
        
//         const params = req.body
//         connection.query('INSERT INTO node SET ?', params, (err, rows) => {
//         connection.release() 
//         if(err) throw err;
//         res.send();
        
//         console.log('The data from Node table are:11 \n', rows)

//         })
//     })
// });


//Update node with ID- API
// apiRoute.put('/update-node-with-id', userMiddleware.isLoggedIn, (req, res) => {

//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         console.log(`connected as id ${connection.threadId}`)

//         const { id, name } = req.body

//         connection.query('UPDATE node SET name = ? WHERE id = ?', [name, id] , (err, rows) => {
//             connection.release() 
//             if(err) throw err;
//             res.send();

//         })
//     })
// })

/////////////////////////////////////////////////////////////////////////////////////////////

apiRoute.post('/insert-user-data', userMiddleware.isLoggedIn, (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        const params = req.body
        connection.query('INSERT INTO user_data SET ?', params, (err, rows) => {
        connection.release() 
        if(err) throw err;
        res.send();
        
        console.log('The data from Node table are:11 \n', rows)

        })
    })
});


apiRoute.put('/update-user-data', userMiddleware.isLoggedIn, (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id, name, added_by_user_id, added_by_user_name  } = req.body

        connection.query('UPDATE user_data SET name = ?, added_by_user_id = ?, added_by_user_name = ? WHERE id = ?', 
        [name, added_by_user_id, added_by_user_name,id] , (err, rows) => {
            connection.release() 
            if(err) throw err;
            res.send();
        })
    })
})


apiRoute.get('/edit-user-data/:id', userMiddleware.isLoggedIn, (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * FROM user_data WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release()
            if(err) throw err;
            res.send(rows);
        })
    })
});

apiRoute.delete('/delete-user-data/:id', userMiddleware.isLoggedIn, (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM user_data WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release()
            if(err) throw err;
            res.send();
        })
    })
});

// apiRoute.get('/all-user-data', userMiddleware.isLoggedIn, (req, res) => {
//     pool.getConnection((err, connection) => {
//         if(err) throw err
//         console.log('connected as id ' + connection.threadId)
//         connection.query('SELECT * from user_data', (err, rows) => {
//             connection.release()
//             if(err) throw err;
//             res.send(rows);
//         })
//     })
// })

apiRoute.get('/all-user-data/:added_by_user_id', userMiddleware.isLoggedIn, (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * FROM user_data WHERE added_by_user_id = ?', [req.params.added_by_user_id], (err, rows) => {
            connection.release()
            if(err) throw err;
            res.send(rows);
        })
    })
});



module.exports = apiRoute;