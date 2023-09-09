import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useEffect, useState } from "react";
import { getAdvert } from "./service";
import { Card } from "react-bootstrap";
import placeholderPhoto from "../../assets/placeholder.png";

const AdvertDetail = (props) => {
  const params = useParams();
  const [advert, setAdvert] = useState([]);

  useEffect(() => {
    getAdvert(params.advertId).then((advert) => setAdvert(advert));
  }, [params.advertId]);

  //TODO: LOGIN botones de modificar anuncios o borrar en caso de ser dueño del anuncio
  //TODO: LOGIN boton de contactar en caso de querer vender al anunciante o de comprar en caso de querer comprar.

  return (
    <Layout title="Detalle de anuncio">
      <div className="d-flex justify-content-center">
        <Card
          key={advert._id}
          style={{ width: "100%", maxWidth: "30rem" }}
          className="mb-5 mx-2"
        >
          <Card.Header>{advert.type}</Card.Header>
          <Card.Body>
            <Card.Title>{advert.name}</Card.Title>
            <Card.Img
              variant="top"
              src={
                advert.photo
                  ? `${process.env.REACT_APP_API_BASE_URL}/uploads/${advert.photo}`
                  : placeholderPhoto
              }
            />
            <Card.Text>{advert.description}</Card.Text>
            <Card.Text>Se ofrece {advert.price} €</Card.Text>
            <Card.Footer>Etiquetas: {advert.tags}</Card.Footer>
          </Card.Body>
        </Card>
      </div>
    </Layout>
  );
};

export default AdvertDetail;
