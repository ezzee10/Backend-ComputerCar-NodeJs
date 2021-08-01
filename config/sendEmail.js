const transporter = require("./email");

const sendEmail = (email, title, body) => {
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: title,
      html: body,
    };
  
    transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        console.log(error);
      }
    });
};

module.exports = {sendEmail};