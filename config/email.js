const mailer = require("nodemailer");
const smtp = require("nodemailer-smtp-transport");

let transporter = mailer.createTransport(
  smtp({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD_EMAIL,
    },
  })
);

module.exports = transporter;
