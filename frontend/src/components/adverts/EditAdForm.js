import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Modal,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getAdvert } from "./service";
import { editAdvert } from "./service";

function EditAdForm() {
  const { id } = useParams();

  const [adData, setAdData] = useState({
    name: "",
    price: "",
    description: "",
    type: "",
    tags: [],
    photo: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAdvert(id) // Llama a la función getAdvert del servicio
      .then((data) => {
        const updatedAdData = {
          name: data.name, 
          price: data.price,
          description: data.description,
          type: data.type,
          tags: data.tags,
          photo: data.photo,
        };
        setAdData(updatedAdData); // Actualiza el estado con los datos del anuncio
      })
      .catch((error) => {
        setErrorMessage(
          "Error al obtener los datos del anuncio. Por favor, inténtalo de nuevo."
        );
      });
  }, [id]);


  const validateForm = () => {
    const errors = {};
    if (!adData.name) {
      errors.name = "El título es obligatorio";
    }
    if (!adData.price) {
      errors.price = "El precio es obligatorio";
    }
    if (!adData.description) {
      errors.description = "La descripción es obligatoria";
    }
    if (!adData.tags) {
      errors.tags = "Al menos una etiqueta es obligatoria";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setShowModal(true);
    }
  };

  const handleConfirm = () => {
    setShowModal(false);

    // Utiliza la función editAdvert del servicio para hacer la solicitud PUT
    editAdvert(id, adData)
      .then(() => {
        setSuccessMessage("Anuncio editado con éxito");
        setErrorMessage("");
      })
      .catch(() => {
        setErrorMessage(
          "Error al editar el anuncio. Por favor, inténtalo de nuevo."
        );
        setSuccessMessage("");
      });
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <Modal show={showModal} onHide={handleCancel}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              ¿Estás seguro de que deseas guardar los cambios?
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

          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <Form onSubmit={handleSubmit} encType="multipart/form-data">
            <Form.Group controlId="formName">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Escribe el título"
                value={adData.name}
                onChange={handleInputChange}
              />
              {formErrors.name && (
                <Form.Text className="text-danger">{formErrors.name}</Form.Text>
              )}
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Escribe el precio"
                value={adData.price}
                onChange={handleInputChange}
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
                name="description"
                placeholder="Escribe la descripción"
                value={adData.description}
                onChange={handleInputChange}
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
                name="type"
                value={adData.type}
                onChange={handleInputChange}
              >
                <option value="compra">Compra</option>
                <option value="venta">Venta</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formTags">
              <Form.Label>Etiquetas (separadas por comas)</Form.Label>
              <Form.Control
                type="text"
                name="tags"
                placeholder="Ejemplo: etiqueta1, etiqueta2"
                value={adData.tags.join(", ")}
                onChange={(e) =>
                  setAdData({ ...adData, tags: e.target.value.split(", ") })
                }
              />
              {formErrors.tags && (
                <Form.Text className="text-danger">{formErrors.tags}</Form.Text>
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditAdForm;
