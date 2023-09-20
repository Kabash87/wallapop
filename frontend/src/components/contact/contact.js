import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useEffect, useState } from "react";
import { getAdvert } from "./service";
import { Button, Card, Container, Modal, Alert, Form } from "react-bootstrap";
import placeholderPhoto from "../../assets/placeholder.png";
import { contactSeller } from "./service";

function Contact() {
  const params = useParams();
  const [advert, setAdvert] = useState(null);

  const cookie = require("js-cookie");
  const emailToken = cookie.get("email-user");
  const username = cookie.get("user-name");

  if (!username) {
    window.location.href = "http://localhost:3000/login";
  }

  useEffect(() => {
    getAdvert(params.advertId).then((advert) => setAdvert(advert));
  }, [params.advertId]);

  //TODO: botones de modificar anuncios o borrar en caso de ser dueño del anuncio
  //TODO: boton de contactar en caso de querer vender al anunciante o de comprar en caso de querer comprar.

  // Estado para almacenar el mensaje de éxito
  const [successMessage, setSuccessMessage] = useState("");

  // Estado para almacenar el mensaje de error
  const [errorMessage, setErrorMessage] = useState("");

  // Estado para controlar la visibilidad del Modal
  const [showModal, setShowModal] = useState(false);

  const validateForm = () => {
    const errors = {};
    // Comprobaciones para cada campo requerido
    // Actualiza el estado de los errores de validación

    // Devuelve true si no hay errores, de lo contrario, devuelve false
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realiza la validación del formulario antes de enviar la solicitud
    if (validateForm()) {
      // Mostrar el Modal de confirmación
      setShowModal(true);
    }
  };

  const handleConfirm = async () => {
    // Cerrar el Modal de confirmación
    setShowModal(false);

    const info = {
      postName: advert.name,
      postPhoto: advert.photo,
      postType: advert.type,
      postDescription: advert.description,
      postPrice: advert.price,
      postTag: advert.tags,
      postUsername: advert.username,
      postemail: advert.email,
      senderEmail: emailToken,
      senderName: username,
    };
    console.log("Datos a enviar al servidor:", info);

    // Realizar la petición POST al backend
    try {
      await contactSeller(info);
      setSuccessMessage("Se ha enviado un correo al vendedor exitosamente");
      setErrorMessage("");
    } catch (error) {
      // Si ocurre un error, establecer el mensaje de error y limpiar el mensaje de éxito
      setErrorMessage(
        "Ha ocurrido un error para enviar el correo, Intentelo nuevamente."
      );
      setSuccessMessage("");
    }
  };

  const handleCancel = () => {
    // Cerrar el Modal de confirmación sin hacer ninguna acción
    setShowModal(false);
  };

  return (
    <Container>
      <Layout title="Contactar al Vendedor">
        <p>Estas a un solo paso de tener ese producto de tus sueños.</p>
        {/*Modal de confirmación */}
        <Modal show={showModal} onHide={handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Estás seguro de que deseas contactar al Vendedor?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button variant="dark" onClick={handleConfirm}>
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>

        {/*Alert para mostrar el mensaje de éxito */}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}
        {/*Alert para mostrar el mensaje de error */}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <div
          className="Separacion"
          style={{ display: "flex", flexFlow: "row wrap" }}
        >
          <div
            className="Publicacion"
            style={{ minWidth: "30rem", maxWidth: "30rem", margin: "30px" }}
          >
            {advert && (
              <Card
                key={advert._id}
                style={{ width: "100%", maxWidth: "30rem" }}
                className="mb-5 mx-2"
              >
                <Card.Header>{advert.type}</Card.Header>
                <Card.Body>
                  <Card.Title>{advert.name}</Card.Title>
                  <Card.Img
                    variant="top"
                    style={{ width: "150px" }}
                    src={
                      advert.photo
                        ? `${process.env.REACT_APP_API_BASE_URL}/uploads/${advert.photo}`
                        : placeholderPhoto
                    }
                  />
                  <Card.Text>{advert.description}</Card.Text>
                  <Card.Text>Se ofrece {advert.price} €</Card.Text>
                  <Card.Footer>Etiquetas: {advert.tags}</Card.Footer>
                </Card.Body>
              </Card>
            )}
          </div>

          <div
            style={{
              minWidth: "30rem",
              maxWidth: "30rem",
              margin: "30px",
            }}
          >
            {advert && (
              <Card>
                <Card.Header>
                  <h6>Informacion del Vendedor</h6>
                </Card.Header>
                <Card.Body>
                  <Card.Title>Nombre del Vendedor:</Card.Title>
                  <p>{advert.username}</p>
                </Card.Body>
              </Card>
            )}
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Button
                variant="secondary"
                style={{
                  minWidth: "30rem",
                  maxWidth: "30rem",
                  marginTop: "10px",
                  padding: "20px",
                  fontSize: "23px",
                }}
                type="submit"
              >
                Contactar al Vendedor
              </Button>
            </Form>
            <p style={{ fontSize: "10px", fontStyle: "italic" }}>
              (Al darle al boton de Contactar al Vendedor, acepta todo los
              terminos y condiciones de privacidad y de anti-spam para los
              usuarios de What a Duck!)
            </p>
          </div>
        </div>
      </Layout>
    </Container>
  );
}

export default Contact;
