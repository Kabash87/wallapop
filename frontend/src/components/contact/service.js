import client from "../../api/client";

/**
 * llamada al endpoint de la API
 */

const advertsUrl = "/api/adverts";
const contactUrl = "/api/users";

export const getAdvert = (id) => {
  const url = `${advertsUrl}/${id}`;
  return client.get(url);
};

export const contactSeller = (info) => {
  return client.post(`${contactUrl}/contact`, info, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
