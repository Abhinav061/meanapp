const express = require("express");
const usersRoute = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const db = require('../connection/mysql.js');
const userMiddleware = require("../middleware/userRoute.js");
const uuid = require('uuid')
const mailer = require("../lib/mailer.js")
bodyParser = require('body-parser').urlencoded({ extended: true });
// routes/router.js

const JWT_SECRET = 'some Text...'

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
              // user: result[0]
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

usersRoute.get('/get-user-details', userMiddleware.isLoggedIn, (req, res, next) => {

  if (req.headers && req.headers.authorization) {
    var authorization = req.headers.authorization.split(' ')[1], decoded;
    try {
      decoded = jwt.verify(authorization, 'SECRETKEY');
    } catch (e) {
      return res.status(401).send('unauthorized');
    }
    // res.send(decoded)
    db.query(
    `SELECT id, name, email, registered, last_login, role  FROM users WHERE id = ${db.escape(decoded.id)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }
      return res.status(200).send({
        user: result[0]
      });

    }
  );
  }
});

usersRoute.get('/secret-route', userMiddleware.isLoggedIn, (req, res, next) => {
  //console.log(req.userData);
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

usersRoute.get('/forgot-password', (req, res, next) => {
  res.render('../view/forgot-password')
});

usersRoute.post('/forgot-password', bodyParser, (req, res, next) => {
  // console.log(req.body);
  const { email } = req.body;

  db.query(
    `SELECT * FROM users WHERE email = ${db.escape(email)}`,
    async (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }
      if (!result.length) {
        return res.status(409).send({
          msg: `${email} not registered!`,
        });
      }

      if (result[0]["email"] == `${email}`) {
        // const link = `http://localhost:5000/reset-password/${result[0]["id"]}/${token}`

        await mailer.resetPasswordMail(result[0]["email"], result[0]["id"], result[0]["token"]);

        // console.log('Link is', link);
        res.send('Password reset link has been sent to your email')
      }
    }
  );
});

usersRoute.get("/reset-password/:id/:token", (req, res, next) => {
  const { id, token } = req.params;
  db.query(
    `SELECT * FROM users WHERE id = ${db.escape(id)}`,
    async (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }

      if (result[0]["id"] != `${id}` || result[0]["token"] != `${token}`) {
        res.send('Invalid Link')
      }
      if (result[0]["id"] == `${id}` && result[0]["token"] == `${token}`) {
        try {
          res.render('../view/reset-password', { email: result[0]["email"] })
        } catch (error) {
          res.send(error.message);
        }
      }
    }
  );


});

usersRoute.post("/reset-password/:id/:token", bodyParser, (req, res, next) => {
  const { id, token } = req.params;
  db.query(
    `SELECT * FROM users WHERE id = ${db.escape(id)}`,
    async (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }

      if (result[0]["id"] != `${id}` || result[0]["token"] != `${token}`) {
        res.send('Invalid Link')
      }

      if (req.body.password != req.body.password2) {
        res.send('Password not matched')
      }
      if (result[0]["id"] == `${id}` && result[0]["token"] == `${token}`) {
        try {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).send({
                msg: err
              });
            } else {
              let token = uuid.v4();

              const storedQuery = db.query(
                `UPDATE users SET token = '${token}', password = ${db.escape(hash)} WHERE id = '${result[0].id}'`,
                async (err, result) => {
                  // user does not exists
                  if (err) {
                    throw err;
                    return res.status(400).send({
                      msg: err,
                    });
                  }

                  if (result) {
                    res.send("Password changed successfully");
                  }
                }
              );
            }
          })


        } catch (error) {
          res.send(error.message);
        }
      }
    }
  );
});


usersRoute.post("/login-mail", userMiddleware.isLoggedIn, (req, res, next) => {
   mailer.loggedInMail(req.body.email,req.body.name);

   res.send(
    { 
      msg: "Login mail sent!"
    }
    );
});

module.exports = usersRoute;