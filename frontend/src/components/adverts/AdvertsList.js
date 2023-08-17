import { useEffect, useState } from "react";
import { getLatestAdverts } from "./service";
import { Card, CardGroup, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import placeholderPhoto from "../../assets/placeholder.png";
import Layout from "../Layout/Layout";

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
  return (
    <Layout title="Listado de anuncios">
      <div className="AdvertsList">
        <div className="d-flex justify-content-center">
          <CardGroup>
            {adverts.map((advert) => (
              <Link
                to={`/adverts/${advert.id}`}
                style={{ textDecoration: "none" }}
                key={advert.id}
              >
                <Card style={{ width: "18rem" }} className="mb-5 mx-2">
                  <Card.Header>{advert.sell ? "Venta" : "Compra"}</Card.Header>
                  <Card.Img
                    variant="top"
                    src={advert.photo ? advert.photo : placeholderPhoto}
                  />
                  <Card.Body>
                    <Card.Title>{advert.name}</Card.Title>
                    <Card.Text>{advert.description}</Card.Text>
                    <ListGroup variant="flush" bg="primary">
                      <ListGroup.Item>
                        {advert.sell
                          ? `Comprar por: ${advert.price}€`
                          : `Vender a: ${advert.price}€`}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      Etiquetas: {advert.tags}
                    </small>
                  </Card.Footer>
                </Card>
              </Link>
            ))}
          </CardGroup>
        </div>
      </div>
    </Layout>
  );
};

export default AdvertsList;
