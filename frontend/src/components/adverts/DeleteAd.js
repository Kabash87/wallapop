import React, { useState } from 'react';
import { deleteAdvert } from './service'; 
import { useNavigate } from 'react-router-dom';

function DeleteAd({ id, onAdDeleted }) {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleConfirm = () => {
    deleteAdvert(id)
      .then(response => {
        setShowModal(false);
        setShowSuccessMessage(true);

        onAdDeleted(id); // Informar al componente padre que el anuncio ha sido borrado

      // Redirigir al usuario a la página principal después de 2 segundos
      setTimeout(() => {
        navigate('/');  // Asume que la ruta de la página principal es '/'
      }, 2000);  
      })
      .catch(error => {
        console.error('Error al borrar el anuncio:', error);
        setErrorMessage('Hubo un error al borrar el anuncio. Por favor intenta nuevamente.');
      });
  };

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Borrar Anuncio</button>
      {showModal && (
        <div>
          <p>¿Estás seguro de que deseas borrar este anuncio?</p>
          <button onClick={handleConfirm}>Confirmar</button>
          <button onClick={() => setShowModal(false)}>Cancelar</button>
        </div>
      )}
      {showSuccessMessage && <p>Anuncio borrado con éxito</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default DeleteAd;
