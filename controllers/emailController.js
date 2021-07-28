const transporter = require("../config/email");
const convertDate = require("../helpers/convertDate");

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

exports.sendEmail = async (req, res) => {
  let info = req.body;
  console.log(info);

  sendEmail(
    "ezequiel.colombano@gmail.com",
    "Información completa del usuario",

    `<div>
      <p>
        Hola ${info.name} ${info.surname} detallamos el estado de tu vehículo:
      </p>
      <p>Los kilómetros totales de su vehículo son: ${info.kms}</p>
      <ul>
        Fechas agendadas:
        <br/>
        <li>Vencimiento de VTV: ${convertDate(new Date(info.note.vtv))}</li>
        <li>Vencimiento de matafuego: ${convertDate(
          new Date(info.note.vtv)
        )}</li>
      </ul>
      <ul>
        Último viaje realizado:
        <br/>
        <li>Lugar de origen: ${info.travel[0].originPlace}</li>
        <li>Fecha y horario de origen: ${info.travel[0].dateOriginPlace}</li>
        <li>Lugar de destino: ${info.travel[0].destinationPlace}</li>
        <li>Fecha y horario de llegada: ${
          info.travel[0].dateDestinationPlace
        }</li>
        <li>Kilómetros recorridos en el viaje: ${
          info.travel[0].kilometresTravel
        }</li>
      </ul>
    </div>`
  );
};
