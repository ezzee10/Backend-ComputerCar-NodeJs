const cron = require('node-cron');
const Note = require('../models/Note');
const transporter = require('../config/email')
require('dotenv').config({ path: '.env' });

var dateYear = new Date().getFullYear();
var dateMonth = new Date().getMonth(); 
var dateDay = new Date().getDate();

const obtenerNotas = async () => {

    let notes = null;
    try {
        notes = await Note.find();    
    } catch (e) {
        console.log(e);
    }
    return notes;
}

const sendEmail = ( mailOptions ) => {

    console.log('Llego aca');

    transporter.sendMail(mailOptions, (error, data) => {

        console.log(data);
        if (error) {
            console.log(error)
        }
    });
}


const startCron = () => {

    // transporter.verify(function(error, success) {
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log("Server is ready to take our messages");
    //     }
    // });

    const mailOptions = {
        from: 'cscgrupo2@gmail.com',
        to: 'ezequiel.colombano@gmail.com',
        subject: `Happy Birthday `,
        html: `Wishing You a <b>Happy birthday </b> On Your , Enjoy your day \n <small>this is auto generated</small>`                       
    }

    sendEmail(mailOptions);

    cron.schedule('40 37 01 * * *', async () => {

        

        let notes = await obtenerNotas();

        notes.forEach(note => {

            if(true){

               

                
                
            } 
        });


    });
}

module.exports = startCron

