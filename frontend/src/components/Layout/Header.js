import { Button, Col, Container, Nav, Navbar } from "react-bootstrap";
import { ReactComponent as Logo } from "../../assets/duck-icon.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <Logo /> What a Duck!
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Quienes somos</Nav.Link>
            <Nav.Link href="/adverts">Anuncios</Nav.Link>
          </Nav>
          <Col xs="auto" className="ms-auto">
            <Link to="/login">
              <Button variant="secondary">Registrarte o Iniciar sesion</Button>
            </Link>
          </Col>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
