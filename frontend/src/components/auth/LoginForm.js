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
import { createAd } from "./service";
import { Link } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      errors.email = "El correo es obligatorio";
    }
    if (!password) {
      errors.password = "La contraseña es obligatorio";
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

    const newAdvert = {
      email: email,
      password: password,
    };
    console.log("Datos a enviar al servidor:", newAdvert);

    // Realizar la petición POST al backend
    try {
      await createAd(newAdvert); // Llama a la función de la API
      setSuccessMessage("Anuncio creado con éxito");
      setErrorMessage("");
      setEmail("");
      setPassword("");
    } catch (error) {
      // Si ocurre un error, establecer el mensaje de error y limpiar el mensaje de éxito
      setErrorMessage(
        "Error al crear el anuncio. Por favor, inténtalo de nuevo."
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
      <Row className="justify-content-md-center">
        <Col md="6">
          {/*Modal de confirmación */}
          <Modal show={showModal} onHide={handleCancel}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              ¿Estás seguro de que deseas crear el Usuario?
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
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <br />
            <h2>Iniciar Sesion</h2>
            <p>No te pierdas de todas las cosas nuevas que tenemos para ti</p>
            <br />
            <Form.Group controlId="formName">
              <Form.Label>Correo Electronico:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu correo electronico..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {formErrors.name && (
                <Form.Text className="text-danger">
                  {formErrors.email}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Contraseña: </Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña..."
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
            <Button variant="primary" type="submit">
              Iniciar Sesión
            </Button>
            <br />
            <br />
            <p>
              ¿No tienes una cuenta creada?{" "}
              <Link to="/register" style={{ textDecoration: "none" }}>
                Registrate aquí
              </Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;