import React, { useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import Layout from "../../Layout/Layout";
import RedirectToHome from "../../RedirectToHome";
import { ModalConfirm, CreateAdForm } from "./components";
import { useFormState, useValidation, usePostAd } from "./hooks";

function CreateAdvert() {
  // Estado para controlar la visibilidad del Modal
  const [showModal, setShowModal] = useState(false);

  const {
    name,
    setName,
    price,
    setPrice,
    description,
    setDescription,
    type,
    setType,
    tags,
    setTags,
    photo,
    setPhoto,
  } = useFormState();

  const { formErrors, validateForm } = useValidation(
    name,
    description,
    price,
    tags
  );
  const { postAd, successMessage, errorMessage, redirectToHome } = usePostAd();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Realiza la validación del formulario antes de enviar la solicitud
    if (validateForm()) {
      // Mostrar el Modal de confirmación
      setShowModal(true);
    }
  };

  const handleConfirm = async () => {
    setShowModal(false);
    const newAdvert = {
      name,
      price: parseFloat(price),
      description,
      type,
      tags: tags.split(",").map((tag) => tag.trim()),
      photo,
    };

    // Recuperar el token de localStorage
    const token = localStorage.getItem('token');
    // Pasar el token como segundo argumento a postAd
    await postAd(newAdvert, token);
    
  };

  const handleCancel = () => {
    // Cerrar el Modal de confirmación sin hacer ninguna acción
    setShowModal(false);
  };

  // Lógica para manejar el envío del formulario y crear el anuncio

  return (
    <Layout title="Crear Anuncio">
      <Container className="mb-5">
        <Row className="justify-content-md-center">
          <Col md="6">
            {!redirectToHome ? (
              <>
                <ModalConfirm
                  showModal={showModal}
                  handleCancel={handleCancel}
                  handleConfirm={handleConfirm}
                />

                {/*Alert para mostrar el mensaje de éxito */}
                {successMessage && (
                  <Alert variant="success">{successMessage}</Alert>
                )}
                {/*Alert para mostrar el mensaje de error */}
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <CreateAdForm
                  formErrors={formErrors}
                  handleSubmit={handleSubmit}
                  name={name}
                  setName={setName}
                  price={price}
                  setPrice={setPrice}
                  description={description}
                  setDescription={setDescription}
                  type={type}
                  setType={setType}
                  tags={tags}
                  setTags={setTags}
                  photo={photo}
                  setPhoto={setPhoto}
                />
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

export default CreateAdvert;
