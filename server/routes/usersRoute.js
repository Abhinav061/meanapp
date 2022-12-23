const express = require("express");
const usersRoute = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const db = require('../connection/mysql.js');
const userMiddleware = require("../middleware/userRoute.js");
const uuid = require('uuid')

// routes/router.js

usersRoute.post('/sign-up', userMiddleware.validateRegister, (req, res, next) => {
  // {
  //   "id" : "",
  //   "name" : "AbhinavJyoti",
  //   "email" : "abhinav@gmail.com",
  //   "password" : "password@12345",
  //   "password_repeat" : "password@12345"
  // }

    db.query(
      `SELECT * FROM users WHERE LOWER(name) = LOWER(${db.escape(
        req.body.name
      )});`,
      (err, result) => {
        if (result.length) {
          return res.status(409).send({
            msg: 'This username is already in use!'
          });
        } else {
          // username is available
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({
                msg: err
              });
            } else {
              // has hashed pw => add to database
              db.query(
                `INSERT INTO users (id, name, email,password, registered, role) VALUES ('${uuid.v4()}', ${db.escape(
                  req.body.name
                )}, ${db.escape(
                  req.body.email
                )}, ${db.escape(hash)}, now(), 'user')`,
                (err, result) => {
                  if (err) {
                    throw err;
                    return res.status(400).send({
                      msg: err
                    });
                  }
                  return res.status(201).send({
                    msg: 'Registered!'
                  });
                }
              );
            }
          });
        }
      }
    );
  });


usersRoute.post('/login', (req, res, next) => {
   const query = db.query(
      `SELECT * FROM users WHERE ${req.body.name.includes("@") ? 'email' : 'name'} = ${db.escape(req.body.name)};`,
      (err, result) => {
        // user does not exists
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err
          });
        }
  
        if (!result.length) {
          return res.status(400).send({
            msg: 'Username or password is incorrect!'
          });
        }
  
        // check password
        bcrypt.compare(
          req.body.password,
          result[0]['password'],
          (bErr, bResult) => {
            // wrong password
            if (bErr) {
              throw bErr;
              return res.status(401).send({
                msg: 'Username or password is incorrect!'
              });
            }
  
            if (bResult) {
              const token = jwt.sign({
                  name: result[0].name,
                  id: result[0].id
                },
                'SECRETKEY', {
                  expiresIn: '7d'
                }
              );
  
              db.query(
                `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
              );
              return res.status(200).send({
                msg: 'Logged in!',
                token,
                user: result[0]
              });
            }
            return res.status(401).send({
              msg: 'Username or password is incorrect!'
            });
          }
        );
      }
    );
    // console.log('********Quer',query);
  });

usersRoute.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
    console.log(req.userData);
    res.send('This is the secret content. Only logged in users can see that!');
  });

module.exports = usersRoute;