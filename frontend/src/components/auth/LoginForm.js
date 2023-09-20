import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "./service";
import Layout from "../Layout/Layout";
import { useAuth } from "../auth/AuthContext";

function LoginForm() {
  const { setIsLogged } = useAuth();
  const navigate = useNavigate();
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

      // Realizar la petición POST al backend
      try {
        const response = await Login(loginForm); // Llama a la función de la API

        // Si el servidor devuelve un token y userId
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.userId);
        setIsLogged(true);

        setSuccessMessage("Login hecho con éxito, bienvenido de vuelta");
        setErrorMessage("");
        setEmail("");
        setPassword("");
        navigate("/adverts");
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
    <Layout title="Login">
      <Container>
        <Row className="justify-content-md-center">
          <Col md="6">
            {/*Alert para mostrar el mensaje de éxito */}
            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}
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
                {formErrors.email && (
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
                {formErrors.password && (
                  <Form.Text className="text-danger">
                    {formErrors.password}
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
              <p>
                ¿Olvidastes tu contraseña?{" "}
                <Link to="/recovery" style={{ textDecoration: "none" }}>
                  Recuperar contraseña
                </Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default LoginForm;
