import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
// import { createAd } from "./service";
import { Link } from "react-router-dom";
import { Login } from "./service";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado para almacenar el mensaje de éxito
  const [successMessage, setSuccessMessage] = useState("");

  // Estado para almacenar el mensaje de error
  const [errorMessage, setErrorMessage] = useState("");

  // Estado para almacenar mensajes de error de validacion
  const [formErrors, setFormErrors] = useState({});

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Realiza la validación del formulario antes de enviar la solicitud
    if (validateForm()) {
      const loginForm = {
        email: email,
        password: password,
      };
      console.log("Datos a enviar al servidor:", loginForm);

      // Realizar la petición POST al backend
      try {
        await Login(loginForm); // Llama a la función de la API
        setSuccessMessage("Login hecho con éxito, bienvenido de vuelta");
        setErrorMessage("");
        setEmail("");
        setPassword("");
        window.location.href = "http://localhost:3000/adverts";
      } catch (error) {
        // Si ocurre un error, establecer el mensaje de error y limpiar el mensaje de éxito
        setErrorMessage(
          "Error al iniciar sesion. Por favor, inténtalo de nuevo."
        );
        setSuccessMessage("");
      }
    }
  };

  // Lógica para manejar el envío del formulario y crear el anuncio

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
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
