import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import Layout from "../../Layout/Layout";
import { EmptyList, ListWithAdverts, Greeting } from "./components";
import { useGetAdverts } from "./hooks";
import Pagination from "./components/Pagination";

const AdvertsList = () => {
  const [adverts, setAdverts] = useState([]);
  const [query, setQuery] = useState("");
  const [username, setUsername] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  
useGetAdverts(setAdverts);

const updateUserInfoFromCookies = () => {
  const cookie = require("js-cookie");
  const usernameFromCookie = cookie.get("user-name");
  setUsername(usernameFromCookie);
};

useEffect(() => {
  // Establece los valores iniciales desde las cookies cuando el componente se monta
  updateUserInfoFromCookies();
}, [username]);

  // Filtro de búsqueda de anuncios
  const filterPosts = adverts.filter((advert) =>
    (advert.name ?? "").toUpperCase().startsWith(query.toUpperCase())
  );

  // Calcula los índices de los anuncios a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAdverts = filterPosts.slice(indexOfFirstItem, indexOfLastItem);

  // devolución de llamada para cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

    return (
        <Layout title="Compra y vende cosas de segunda mano">
        <Greeting 
        username={username}
        />
      <Form>
        <Row className="justify-content-center my-5">
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Buscar en todos los anuncios"
              className="mr-sm-2"
              style={{ width: "600px" }}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </Col>
          <Col xs="auto">
            <Button variant="dark">Buscar</Button>
          </Col>
        </Row>
      </Form>
      {adverts.length > 0 ? (
        <>
          <ListWithAdverts username={username} filterPosts={currentAdverts} />
          <Pagination
            totalItems={filterPosts.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <EmptyList />
      )}
    </Layout>
  );
};

export default AdvertsList;
