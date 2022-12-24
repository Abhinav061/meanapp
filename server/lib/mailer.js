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
      let activationLink = `https://www.mean.w3designing.com/api/user/verify/${userID}/${token}`;
      let mail = {
        from: '<admin@mean.w3designing.com>',
        to: email,
        subject: "Please active your account",
        text: `To activate your account, please click this link: ${activationLink}`,
        html: `<p>To activate your account, please click this link: <a href="${activationLink}">${activationLink}</a></p>`,
      };
      await transporter.sendMail(mail);
    },
  };