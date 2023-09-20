import client from "../../api/client";

/**
 * llamada al endpoint de la API para obtener el listado de anuncios
 */

const recoveryUrl = "/api/users";

export const recoveryPass = (newPass) => {
  return client.post(`${recoveryUrl}/recovery`, newPass, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

//Cambio de contraseña definitivo
export const recoveryPass2 = (newPass2) => {
  return client.post(`${recoveryUrl}/change-password`, newPass2, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
