import { useState } from "react";
import { createAd } from "../../service";

export const usePostAd = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [redirectToHome, setRedirectToHome] = useState(false);

  const postAd = async (newAdvert, token) => {
    try {
      await createAd(newAdvert, token);
      setSuccessMessage("Anuncio creado con éxito");
      setErrorMessage("");
      setTimeout(() => {
        setRedirectToHome(true);
      }, 2000);
    } catch (error) {
      setErrorMessage(
        "Error al crear el anuncio. Por favor, inténtalo de nuevo."
      );
      setSuccessMessage("");
    }
  };

  return { postAd, successMessage, errorMessage, redirectToHome };
};
