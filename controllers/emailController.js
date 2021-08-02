const { sendEmail } = require("../config/sendEmail");
const convertDate = require("../helpers/convertDate");
const Travel = require("../models/Travel");

exports.sendEmail = async (req, res) => {
  let info = req.body;

  let last_travel = await Travel.find({ driver: info.note.driver }).sort({_id:-1}).limit(1);
  
  if (last_travel) {
    info.travel = last_travel;
  }

   sendEmail(
     info.email,
     "Información completa del usuario",

     `<div>
       <p>
         Hola ${info.name} ${info.surname} detallamos el estado de tu vehículo:
       </p>
       <p>Los kilómetros totales de su vehículo son: ${info.kms} kms</p>
       <ul>
         Fechas agendadas:
         <br/>
         <li>Vencimiento de VTV: ${convertDate(new Date(info.note.vtv))}</li>
         <li>Vencimiento de matafuego: ${convertDate(
           new Date(info.note.vtv)
         )}</li>
       </ul>
       ${
         info.travel ? `
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
         `
         : ''
       }
     </div>`
  );

  res.status(200).json({ msg: 'Correo enviado correctamente' });
};
