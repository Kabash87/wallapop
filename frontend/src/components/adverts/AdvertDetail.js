import { useParams, Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useEffect, useState } from "react";
import { getAdvert } from "./service";
import { Button, Card } from "react-bootstrap";
import placeholderPhoto from "../../assets/placeholder.png";
import DeleteAd from "../../components/adverts/DeleteAd";
import RedirectToHome from "../RedirectToHome";

const AdvertDetail = () => {
  const params = useParams();
  const [advert, setAdvert] = useState(null);
  const [operationSuccessful, setOperationSuccessful] = useState(false);

  useEffect(() => {
    getAdvert(params.advertId).then((advert) => setAdvert(advert));
  }, [params.advertId]);

  const handleAdDeleted = (deletedId) => {
    setOperationSuccessful(true);
  };

  const userId = localStorage.getItem("userId");

  //TODO: botones de modificar anuncios o borrar en caso de ser dueño del anuncio
  //TODO: boton de contactar en caso de querer vender al anunciante o de comprar en caso de querer comprar.

  if (operationSuccessful) {
    return <RedirectToHome />;
  }

  return (
    <Layout title="Detalle de anuncio">
      <div className="d-flex justify-content-center">
        {advert && (
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
              <Card.Text>
                {advert.type === "compra"
                  ? `Se ofrece: ${advert.price}€`
                  : `Se vende por: ${advert.price}€`}
              </Card.Text>
              <Card.Footer>Etiquetas: {advert.tags}</Card.Footer>
              {advert && userId === advert.owner && (
                <>
                  <Link
                    to={`/edit/${advert._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="dark" style={{ margin: "5px" }}>
                      Editar
                    </Button>
                  </Link>

                  <DeleteAd id={advert._id} onAdDeleted={handleAdDeleted} />
                  <hr />
                </>
              )}
              <Link
                to={`/contact/${advert._id}`}
                style={{ textDecoration: "none" }}
              >
                <Button variant="secondary">Contactar al vendedor</Button>
              </Link>
            </Card.Body>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default AdvertDetail;
