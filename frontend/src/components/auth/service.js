import client from "../../api/client";

/**
 * llamada al endpoint de la API para obtener el listado de anuncios
 */

const registerUrl = "/api/users";

export const createUser = (newUser) => {
  return client.post(`${registerUrl}/create-user`, newUser, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const Login = (LoginForm) => {
  return client.post(`${registerUrl}/login`, LoginForm, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};



