import { Button, Col, Container, Nav, Navbar } from "react-bootstrap";
import { ReactComponent as Logo } from "../../assets/duck-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useAuth } from "../auth/AuthContext"



function Header() {
  const { isLogged, setIsLogged } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLogged(false);
    navigate('/');
  };

  useEffect(() => {
    const handleStorageChange = () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        
        if (token && userId) {
            setIsLogged(true);
        } else {
            setIsLogged(false);
        }
    };

    // Iniciar escuchando los cambios
    window.addEventListener('storage', handleStorageChange);

    // Llamar a la función una vez al inicio para establecer el estado inicial
    handleStorageChange();

    // Limpiar el listener cuando el componente se desmonte
    return () => window.removeEventListener('storage', handleStorageChange);
}, [setIsLogged]);



  //TODO: hacer que el boton de registrar o iniciar sesion sea de desloguear cuando se onlogin
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <Logo /> What a Duck!
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Quienes somos</Nav.Link>
            <Nav.Link href="/adverts">Anuncios</Nav.Link>
          </Nav>
          <Col xs="auto" className="ms-auto">
          {isLogged ? (
           <Button variant="secondary" onClick={handleLogout}>Logout</Button>
            ) : (
              <Link to="/login">
              <Button variant="secondary">Registrarte o Iniciar sesión</Button>
              </Link>
            )}
          </Col>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
