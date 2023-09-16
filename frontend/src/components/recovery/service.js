import client from "../../api/client";

/**
 * llamada al endpoint de la API para obtener el listado de anuncios
 */

const recoveryUrl = "/api/adverts";

export const recoveryPass = (newPass) => {
  const formData = new FormData();
  formData.append("email", newPass.email);

  return client.post(`${recoveryUrl}/recovery`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

//Cambio de contraseña definitivo
export const recoveryPass2 = (newPass2) => {
  const formData = new FormData();
  formData.append("password", newPass2.password);
  formData.append("emailToken", newPass2.emailToken);
  formData.append("password2", newPass2.password2);

  return client.post(`${recoveryUrl}/change-password`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
