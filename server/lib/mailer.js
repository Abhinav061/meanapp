const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  host: "mean.w3designing.com",
  port: 465,
  secure: true,
  auth: {
    user: 'admin@mean.w3designing.com', // generated ethereal user
    pass: '892oJ9j4mxl+', // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = {
    async sendOptInMail(email, userID, token) {
      let activationLink = `http://www.mean.w3designing.com/api/user/verify/${userID}/${token}`;
      let mail = {
        from: '<admin@mean.w3designing.com>',
        to: email,
        subject: "Please active your account",
        text: `To activate your account, please click this link: ${activationLink}`,
        html: `<p>To activate your account, <a href="${activationLink}">Click here</a></p>`,
      };
      await transporter.sendMail(mail);
    },
  };


  module.exports = {
    async resetPasswordMail(email, id, token) {
      let activationLink = `http://www.mean.w3designing.com/api/user/reset-password/${id}/${token}`;
      let mail = {
        from: '<admin@mean.w3designing.com>',
        to: email,
        subject: "Reset Password",
        text: `To activate your account, please click this link: ${activationLink}`,
        html: `<p>To reset password, <a href="${activationLink}">Click here</a></p>`,
      };
      await transporter.sendMail(mail);
    },
  };


  module.exports = {
    async loggedInMail(email, name) {
      let mail = {
        from: '<admin@mean.w3designing.com>', // sender address
        to: `${email}`, // list of receivers
        subject: "Logged In ✔", // Subject line
        text: "Hello world?", // plain text body
        html:  `Hello <b>${name},</b><br/>
                <p>You have successfully LoggedIn to <a href="mean.w3designing.com">mean.w3designing.com</a></p>`, // html body
    };
      await transporter.sendMail(mail);
    },
  };