const jwt = require('jsonwebtoken');
var validator = require("email-validator");

module.exports = {
    validateRegister: (req, res, next) => {
        if (!req.body.name || req.body.name.length < 3) {
            return res.status(400).send({
                message: "Please enter min 3 char"
            });
        }

         // valide email
        if (!req.body.email || !validator.validate(req.body.email)) {
          return res.status(400).send({
            msg: "Please enter a valid email address",
          });
        }

        if (!req.body.password || req.body.password.length < 3) {
            return res.status(400).send({
                message: "Please enter Password min 6 char"
            });
        }

        if (!req.body.password_repeat ||
            req.body.password != req.body.password_repeat) {
            return res.status(400).send({
                message: "Both passwords must match"
            });
        }
        next();
    },
    // middleware/users.js

isLoggedIn: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(
        token,
        'SECRETKEY'
      );
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).send({
        msg: 'Your session is not valid!'
      });
    }
  },
};