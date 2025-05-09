import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Crypto Tracker</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">Buscar</Nav.Link>
          <Nav.Link as={Link} to="/dashboard">Favoritos</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
