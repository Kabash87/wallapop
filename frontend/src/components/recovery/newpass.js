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
import { recoveryPass2 } from "./service";
import { Link } from "react-router-dom";

function PasswordNew() {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const cookie = require("js-cookie");
  const emailToken = cookie.get("recovery-pass");

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
    if (!password) {
      errors.price = "La nueva contraseña es obligatoria";
    }
    if (!password2) {
      errors.price = "La nueva contraseña es obligatoria";
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

    const newPass2 = {
      password: password,
      emailToken: emailToken,
      password2: password2,
    };
    // Realizar la petición POST al backend
    try {
      await recoveryPass2(newPass2); // Llama a la función de la API
      setSuccessMessage(
        "Se ha cambiado la contraseña de su cuenta correctamente"
      );
      setErrorMessage("");
      setPassword("");
      setPassword2("");
      alert(
        "La contraseña se ha cambiado correctamente, Inicie Sesion de nuevo"
      );
      window.location.href = "http://localhost:4000/api/users/logout";
    } catch (error) {
      // Si ocurre un error, establecer el mensaje de error y limpiar el mensaje de éxito
      setErrorMessage("Las contraseñas no coinciden entre ellas.");
      setSuccessMessage("");
    }
  };

  const handleCancel = () => {
    // Cerrar el Modal de confirmación sin hacer ninguna acción
    setShowModal(false);
  };

  if (!emailToken) {
    window.location.href = "http://localhost:3000/";
  }
  // Lógica para manejar el envío del formulario y crear el anuncio

  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        margin: "0 auto",
        padding: "17px",
      }}
    >
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
              backgroundColor: "#BC05C8",
              color: "#FFFFFF ",
            }}
          >
            <br />
            <h2>Recuperar contraseña</h2>
            <p>
              Ingresa tu nueva contraseña y asegurate repitiendola para
              actualizar la configuracion en tu cuenta{" "}
            </p>
            <h6>Su correo electronico es: {emailToken}</h6>

            <Form.Group controlId="formPrice">
              <Form.Label> Nueva Contraseña: </Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu  nueva contraseña..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {formErrors.price && (
                <Form.Text className="text-danger">
                  {formErrors.price}
                </Form.Text>
              )}
            </Form.Group>
            <br />
            <Form.Group controlId="formPrice2">
              <Form.Label>Repita la Nueva Contraseña: </Form.Label>
              <Form.Control
                type="password"
                placeholder="Repite tu nueva contraseña..."
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              {formErrors.price && (
                <Form.Text className="text-danger">
                  {formErrors.price}
                </Form.Text>
              )}
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
              Cambiar contraseña
            </Button>
            <br />
            <br />
            <p>
              ¿Estas perdido?{" "}
              <Link to="/login" style={{ textDecoration: "none" }}>
                Iniciar Sesion
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default PasswordNew;
