import { useEffect, useState } from "react";
import { getLatestAdverts } from "./service";
import {
  Button,
  Card,
  CardGroup,
  Col,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import placeholderPhoto from "../../assets/placeholder.png";
import Layout from "../Layout/Layout";
import DeleteAd from './DeleteAd';
import { deleteAdvert } from './service'; 

const AdvertsList = () => {
  //TODO: dispatch to props
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    // toma la lista de anuncios del backend por axios
    getLatestAdverts().then((adverts) => {
      setAdverts(adverts);
    });
  }, []);
  //TODO: el margen izquierdo de las cards desaparece

  const handleDelete = async (id) => {
    try {
      await deleteAdvert(id);
      // Refresca la lista de anuncios o quita el anuncio de la lista en el estado
      setAdverts((prevAdverts) =>
        prevAdverts.filter((advert) => advert._id !== id)
      );
    } catch (error) {
      console.error("Hubo un error al borrar el anuncio:", error);
    }
  };

  return (
    <Layout title="Compra y vende cosas de segunda mano">
      <Form>
        <Row className="justify-content-center my-5">
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Buscar en todos los anuncios"
              className=" mr-sm-2"
              style={{ width: "600px" }}
            />
          </Col>
          <Col xs="auto">
            <Button variant="secondary">Buscar</Button>
          </Col>
        </Row>
      </Form>
      <Link to="/create-advert" style={{ textDecoration: "none" }}>
        <Button variant="primary">Crear Anuncio</Button>
      </Link>
      <div className="AdvertsList">
        <div className="d-flex justify-content-center">
          <CardGroup>
            {adverts.map((advert) => (
              <Card
                key={advert._id}
                style={{ width: "18rem" }}
                className="mb-5 mx-2"
              >
                <Card.Header>{advert.type ? "venta" : "compra"}</Card.Header>
                <Card.Img
                  variant="top"
                  src={advert.photo ? advert.photo : placeholderPhoto}
                />
                <Card.Body>
                  <Card.Title>{advert.name}</Card.Title>
                  <Card.Text>{advert.description}</Card.Text>
                  <ListGroup variant="flush" bg="primary">
                    <ListGroup.Item>
                      {advert.type === "compra"
                        ? `Compra por: ${advert.price}€`
                        : `Venta por: ${advert.price}€`}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Etiquetas: {advert.tags}</small>
                </Card.Footer>
                <Link
                  to={`/edit/${advert._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button variant="primary">Editar</Button>
                </Link>
                <DeleteAd onDelete={handleDelete} id={advert._id} />
              </Card>
            ))}
          </CardGroup>
        </div>
      </div>
    </Layout>
  );
};

export default AdvertsList;
