const express = require("express");
const usersRoute = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const db = require('../connection/mysql.js');
const userMiddleware = require("../middleware/userRoute.js");
const uuid = require('uuid')
const mailer = require("../lib/mailer.js")

// routes/router.js

usersRoute.post('/sign-up', userMiddleware.validateRegister, (req, res, next) => {
    db.query(
      `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
        req.body.email
      )});`,
      (err, result) => {
        if (result.length) {
          return res.status(409).send({
            msg: `${req.body.email} already registered!`
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

              let email = req.body.email;
              let userID = uuid.v4();
              let token = uuid.v4();

              db.query(
                `INSERT INTO users (id, name, email,password, registered, role, active, token) VALUES (
                  '${userID}',
                   ${db.escape(req.body.name)},
                   ${db.escape(email)},
                   ${db.escape(hash)},
                   now(),
                   'user',
                   0,
                   '${token}')`,
                async (err, result) => {
                  if (err) {
                    throw err;
                    return res.status(400).send({
                      msg: err
                    });
                  }

                  await mailer.sendOptInMail(
                    email,
                    userID,
                    token
                  );

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

        if (!result[0]["active"]) {
          return res.status(401).send({
            msg: "Your account is not activated!",
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
                  expiresIn: '1d'
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


  usersRoute.get("/verify/:userID/:token", (req, res, next) => {
    let userID = req.params.userID;
    let token = req.params.token;
    db.query(
      `SELECT * FROM users WHERE id = ${db.escape(userID)}`,
      (err, result) => {
        // user does not exists
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err,
          });
        }
        // no result from database
        if (!result.length) {
          return res.status(409).send({
            msg: "The requested parameters are incorrect!",
          });
        }
        // already activated
        if (result[0]["active"]) {
          return res.status(409).send({
            msg: "Account is already activated!",
          });
        }
        // wrong activation token
        if (result[0]["token"] !== token) {
          return res.status(401).send({
            msg: "The requested parameters are incorrect!",
          });
        }
        // set account active
        db.query(
          `UPDATE users SET active = 1 WHERE id = '${userID}'`,
          (err, result) => {
            if (err) {
              throw err;
              return res.status(400).send({
                msg: err,
              });
            }
            return res.status(200).send({
              msg: "Account activated",
            });
          }
        );
      }
    );
  });

module.exports = usersRoute;