import { Link } from "react-router-dom";
import { Button, CardGroup, Card, ListGroup } from "react-bootstrap";
import DeleteAd from '../../DeleteAd';
import placeholderPhoto from "../../../../assets/placeholder.png";


export const ListWithAdverts = ({ username, filterPosts, handleAdDeleted }) => (
    <>
      {username && (
        <Link
          to="/create-advert"
          style={{
            textDecoration: "none",
            position: "absolute",
            top: "110px",
            right: "140px",
          }}
        >
          <Button variant="dark">Crear Anuncio</Button>
        </Link>
      )}
      <br />
      <br />
      <div className="AdvertsList">
        <div className="d-flex justify-content-center">
          <CardGroup>
            {(filterPosts ?? []).map((advert) => (
              <Card
                key={advert._id}
                style={{ width: "18rem" }}
                className="mb-5 mx-2"
              >
                <Card.Header>{advert.type}</Card.Header>
                <Link to={`/detail/${advert._id}`}>
                  <Card.Img
                    variant="top"
                    src={
                      advert.photo
                        ? `${process.env.REACT_APP_API_BASE_URL}/uploads/${advert.photo}`
                        : placeholderPhoto
                    }
                  />
                </Link>
                <Card.Body>
                  <Card.Title>{advert.name}</Card.Title>
                  <Card.Text>{advert.description}</Card.Text>
                  <ListGroup variant="flush" bg="dark">
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
                  <Button variant="dark">Editar</Button>
                </Link>
                <DeleteAd onAdDeleted={handleAdDeleted} id={advert._id} />
              </Card>
            ))}
          </CardGroup>
        </div>
      </div>
    </>
  );