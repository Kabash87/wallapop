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
import { createUser } from "./service";
import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import RedirectToHome from "../RedirectToHome";

function CreateRegister() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("hombre");
  const [password, setPassword] = useState("");

  // Estado para almacenar el mensaje de éxito
  const [successMessage, setSuccessMessage] = useState("");

  // Estado para almacenar el mensaje de error
  const [errorMessage, setErrorMessage] = useState("");

  // Estado para almacenar mensajes de error de validacion
  const [formErrors, setFormErrors] = useState({});

  // Estado para controlar la visibilidad del Modal
  const [showModal, setShowModal] = useState(false);

  const [redirectToHome, setRedirectToHome] = useState(false);


  const validateForm = () => {
    const errors = {};
    // Comprobaciones para cada campo requerido
    if (!name) {
      errors.name = "El nombre es obligatorio";
    }
    if (!number) {
      errors.number = "El número telefonico es obligatorio";
    }
    if (!email) {
      errors.email = "El correo electronico es obligatorio";
    }
    if (!password) {
      errors.password = "La contraseña es obligatoria";
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

    const newUser = {
      name: name,
      number: number,
      email: email,
      gender: gender,
      password: password,
    };

    // Realizar la petición POST al backend
    try {
      await createUser(newUser); // Llama a la función de la API
      setSuccessMessage("Usuario creado con éxito");
      setErrorMessage("");
      setName("");
      setNumber("");
      setEmail("");
      setPassword("");
      setRedirectToHome(true);
    } catch (error) {
      // Si ocurre un error, establecer el mensaje de error y limpiar el mensaje de éxito
      setErrorMessage(
        "Error al crear el usuario. Por favor, inténtalo de nuevo."
      );
      setSuccessMessage("");
    }
  };

  const handleCancel = () => {
    // Cerrar el Modal de confirmación sin hacer ninguna acción
    setShowModal(false);
  };

  // Lógica para manejar el envío del formulario y crear el usuario

  return (
    <Layout>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="6">
          {!redirectToHome ? (
            <>
            {/*Modal de confirmación */}
            <Modal show={showModal} onHide={handleCancel}>
              <Modal.Header closeButton>
                <Modal.Title>Confirmar</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Estás seguro de que deseas crear el usuario?
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
            {successMessage && (
              <Alert variant="success">{successMessage}</Alert>
            )}
            {/*Alert para mostrar el mensaje de error */}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <br />
              <h2>Registrate gratis</h2>
              <p>No te pierdas de todas las cosas nuevas que tenemos para ti</p>
              <br />

              <Form.Group controlId="formName">
                <Form.Label>Nombre y Apellido:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="¿Como te llamas?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {formErrors.name && (
                  <Form.Text className="text-danger">
                    {formErrors.name}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="formGender">
                <Form.Label>¿Cual es tu género?</Form.Label>
                <Form.Control
                  as="select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled>
                    - - - Selecciona tu género - - -
                  </option>
                  <option value="hombre">Hombre</option>
                  <option value="mujer">Mujer</option>
                </Form.Control>
              </Form.Group>

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

              <Form.Group controlId="formPrice">
                <Form.Label>Número de telefono:</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Ingresa tu numero de contacto"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
                {formErrors.number && (
                  <Form.Text className="text-danger">
                    {formErrors.number}
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su contraseña"
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
              <Button variant="dark" type="submit">
                Registrarse
              </Button>
              <br />
              <br />
              <p>
                ¿Ya tienes una cuenta creada?{" "}
                <Link to="/login" style={{ textDecoration: "none" }}>
                  Inicia Sesión
                </Link>
              </p>
            </Form>
            </>
          ) : (
            <RedirectToHome />
          )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default CreateRegister;
