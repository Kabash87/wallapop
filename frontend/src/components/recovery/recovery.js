import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Modal,
} from "react-bootstrap";
import { recoveryPass } from "./service";
import { Link } from "react-router-dom";

function Recovery() {
  const [email, setEmail] = useState("");

  // Estado para almacenar el mensaje de éxito
  const [successMessage, setSuccessMessage] = useState("");

  // Estado para almacenar el mensaje de error
  const [errorMessage, setErrorMessage] = useState("");

  // Estado para almacenar mensajes de error de validacion
  const [formErrors, setFormErrors] = useState({});

  // Estado para controlar la visibilidad del Modal
  const [showModal, setShowModal] = useState(false);

  const validateForm = () => {
    const errors = {};
    // Comprobaciones para cada campo requerido
    if (!email) {
      errors.price = "El correo electronico es obligatorio";
    }
    // Actualiza el estado de los errores de validación
    setFormErrors(errors);

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

    const newPass = {
      email: email,
    };
    console.log("Datos a enviar al servidor:", newPass);

    // Realizar la petición POST al backend
    try {
      await recoveryPass(newPass); // Llama a la función de la API
      setSuccessMessage(
        "Se ha enviado un correo de recuperacion para cambiar la contraseña de la cuenta"
      );
      setErrorMessage("");
      setEmail("");
    } catch (error) {
      // Si ocurre un error, establecer el mensaje de error y limpiar el mensaje de éxito
      setErrorMessage(
        "No se ha encontrado el correo dentro de la Base de Datos."
      );
      setSuccessMessage("");
    }
  };

  const handleCancel = () => {
    // Cerrar el Modal de confirmación sin hacer ninguna acción
    setShowModal(false);
  };

  // Lógica para manejar el envío del formulario y crear el anuncio

  return (
    <Container>
      <br />
      <br />
      <Row className="justify-content-md-center">
        <Col md="6">
          {/*Modal de confirmación */}
          <Modal show={showModal} onHide={handleCancel}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              ¿Estás seguro de que deseas cambiar tu contraseña?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleConfirm}>
                Aceptar
              </Button>
            </Modal.Footer>
          </Modal>

          {/*Alert para mostrar el mensaje de éxito */}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {/*Alert para mostrar el mensaje de error */}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            style={{
              padding: "30px",
              width: "700px",
              borderRadius: "30px",
              backgroundColor: "#46278A",
              color: "#FFFFFF ",
              position: "absolute",
              top: "25%",
              left: "25%",
            }}
          >
            <br />
            <h2>Recuperar contraseña</h2>
            <p>
              Ingresa el correo electronico con que creaste tu cuenta y te
              enviaremos un enlace para recuperar tu contraseña{" "}
            </p>
            <br />

            <Form.Group controlId="formEmail">
              <Form.Label>Correo Electronico:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo electronico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {formErrors.email && (
                <Form.Text className="text-danger">
                  {formErrors.email}
                </Form.Text>
              )}
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
              Enviar correo
            </Button>
            <br />
            <br />
            <p>
              ¿Estas perdido?{" "}
              <Link to="/" style={{ textDecoration: "none" }}>
                Volver al Inicio
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Recovery;
