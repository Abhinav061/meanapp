const express = require("express");
const emailRoute = express.Router();
const userMiddleware = require("../middleware/userRoute.js");

const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "mean.w3designing.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'admin@mean.w3designing.com', // generated ethereal user
      pass: '892oJ9j4mxl+', // generated ethereal password
    },
  });

emailRoute.post('/login', userMiddleware.isLoggedIn, (req, res) => {
    let info = transporter.sendMail({
        from: '<admin@mean.w3designing.com>', // sender address
        to: `${req.body.email}`, // list of receivers
        subject: "Logged In ✔", // Subject line
        text: "Hello world?", // plain text body
        html:  `Hello <b>${req.body.name},</b><br/>
                <p>You have successfully LoggedIn to <a href="mean.w3designing.com">mean.w3designing.com</a></p>`, // html body
    });
})


module.exports = emailRoute;