const express = require("express");
const router = express.Router();

//Configuracion de correos
const { transporter } = require("../../../utils/userHelpers");

//Correo de contacto
router.post("/", async (req, res) => {
  try {
    console.log("Iniciando contacto del Vendedor y comprador");
    res.status(201).json({
      mensaje: "El correo de contacto se ha enviado correctamente",
    });
    const {
      postName,
      postType,
      postDescription,
      postPrice,
      postTag,
      postUsername,
      postemail,
      senderEmail,
      senderName,
    } = req.body;

    //Envio de Correo Electronico
    var mailOptions = {
      from: "whataduck.project@gmail.com",
      to: postemail,
      subject: `What a Duck! 🦆¡ ${senderName} esta muy interesado en comprarte ${postName}!`,
      html: `<h2>¡Hola ${postUsername}! Tenemos muy buenas noticias que pueden interesarte</h2>
             <h3>Una persona se encuentra interesada de la siguiente publicacion:</h3>
             <div style=" border: solid; margin: 2px; padding: 20px; width: 70%; border-color: #ed50f9;
              border-radius: 20px;">
             <h3>${postName}</h3>
             <p>${postDescription}</p>
             <p>Post de tipo: ${postType}</p>
             <p>Tags de la publicacion: ${postTag}</p>
             <h3>Precio de la publicacion: ${postPrice} €</h3>
             </div> 
             <div>
             <h3>Informacion del Comprador:</h3>
             <p>Nombre del Interesado: ${senderName}</p>
             <p>Correo de Contacto: ${senderEmail}</p>
             </div>
             <hr/>
             <h3>¿Ya has decidido que hacer?</h3>
             <p>Entra a What a Duck! y revisa tu publicacion, ¡No pierdas esta oportunidad!</p>
             <a href="http://localhost:3000/"><button
              style="
                padding: 15px;
                border: none;
                border-radius: 20px;
                background-color: #5bb75a;
              ">Entrar a What a Duck!</button></a>
            <hr/><br/><br/>`,
    };

    //Se envia el correo de verificacion
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("El correo de contacto ha sido enviado correctamente");
      }
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
