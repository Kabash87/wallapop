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

function CreateAdForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("compra"); // Por defecto, el tipo es "compra"
  const [tags, setTags] = useState("");
  const [photo, setPhoto] = useState("");

  //Logica de bloqueo de acceso si no hay un usuario iniciado sesion
  //Validacion de que hay un Token para crear un Anuncio
  const cookie = require("js-cookie");
  const username = cookie.get("user-name");
  const emailToken = cookie.get("email-user");
  if (!username) {
    window.location.href = "http://localhost:3000/login";
  }

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
    if (!name) {
      errors.name = "El título es obligatorio";
    }
    if (!description) {
      errors.description = "La descripción es obligatoria";
    }
    if (!price) {
      errors.price = "El precio es obligatorio";
    }
    if (!tags) {
      errors.tags = "Las etiquetas son obligatorias";
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
      name: name,
      price: parseFloat(price),
      description: description,
      type: type,
      tags: tags.split(",").map((tag) => tag.trim()), // Divide la cadena y elimina espacios en blanco
      photo: photo,
      username: username,
      email: emailToken,
    };
    console.log("Datos a enviar al servidor:", newAdvert);

    // Realizar la petición POST al backend
    try {
      await createAd(newAdvert); // Llama a la función de la API
      setSuccessMessage("Anuncio creado con éxito");
      setErrorMessage("");
      setName("");
      setPrice("");
      setDescription("");
      setType("compra");
      setTags("");
      setPhoto("");
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
              ¿Estás seguro de que deseas crear el anuncio?
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
          <br />
          <h3>Crear nuevo anuncio</h3>
          <br />
          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group controlId="formName">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Escribe el título"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {formErrors.name && (
                <Form.Text className="text-danger">{formErrors.name}</Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Escribe el precio"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {formErrors.price && (
                <Form.Text className="text-danger">
                  {formErrors.price}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Escribe la descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {formErrors.description && (
                <Form.Text className="text-danger">
                  {formErrors.description}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="formType">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                as="select"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="compra">Compra</option>
                <option value="venta">Venta</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formTags">
              <Form.Label>Etiquetas (separadas por comas)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ejemplo: etiqueta1, etiqueta2"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              {formErrors.tags && (
                <Form.Text className="text-danger">{formErrors.tags}</Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="formPhoto">
              <Form.Label>Foto</Form.Label>
              <Form.Control
                type="file"
                accept=".jpg, .jpeg, .png, .pdf, .doc, .docx"
                name="photo"
                onChange={(e) => setPhoto(e.target.files[0])}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Crear Anuncio
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateAdForm;
