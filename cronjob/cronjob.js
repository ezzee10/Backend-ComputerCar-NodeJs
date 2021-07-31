const cron = require("node-cron");
const Note = require("../models/Note");
const transporter = require("../config/email");
const convertDate = require("../helpers/convertDate");
const diffDates = require("../helpers/diffDates");
require("dotenv").config({ path: ".env" });

const obtenerNotas = async () => {
  let notes = null;
  try {
    notes = await Note.find().populate("driver");
  } catch (e) {
    console.log(e);
  }
  return notes;
};

const sendEmail = (email, title, body) => {
  const mailOptions = {
    from: "cscgrupo2@gmail.com",
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

const startCron = () => {
  cron.schedule("31 16 15 * * *", async () => {
    let dateNow = new Date();

    let notes = await obtenerNotas();

    notes.forEach((note) => {

      if (note.vtv !== undefined) {
        let noteDateVTV = new Date(note.vtv);
        let diffVTV = diffDates(noteDateVTV, dateNow);

        if (diffVTV === 29 || diffVTV === 0) {
          
          sendEmail(
            "cscgrupo2@gmail.com",
            "Información sobre turno VTV",
            diffVTV === 29
              ? `Le recordamos que su VTV vencerá dentro de 30 días. La fecha estipulada es el ${convertDate(
                  noteDateVTV
                )}`
              : `Le recordamos que su VTV vence mañana. La fecha estipulada es el ${convertDate(
                  noteDateVTV
                )}`
          );
        }
      }

      if(note.fireExtinguisher !== undefined) {
        let noteDateFireExtinguisher = new Date(note.fireExtinguisher);
        let diffFireExtinguisher = diffDates(noteDateFireExtinguisher, dateNow);

        if (diffFireExtinguisher === 29 || diffFireExtinguisher === 0) {
          sendEmail(
            "cscgrupo2@gmail.com",
            "Información sobre fecha vencimiento matafuego",
            diffFireExtinguisher === 29
              ? `Le recordamos que su matafuegos vencerá dentro de 30 días. La fecha estipulada es el ${convertDate(
                  noteDateFireExtinguisher
                )}`
              : `Le recordamos que su matafuegos vence mañana. La fecha estipulada es el ${convertDate(
                  noteDateFireExtinguisher
                )}`
          );
        }
      }

    });
  });
};

module.exports = startCron;
