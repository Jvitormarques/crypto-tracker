import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function AppNavbar() {
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Crypto Tracker</Navbar.Brand>
        
        {isAuthenticated && (
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Buscar</Nav.Link>
            <Nav.Link as={Link} to="/dashboard">Favoritos</Nav.Link>
          </Nav>
        )}

        <Nav className="ms-auto">
          {isAuthenticated ? (
            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-light" id="user-dropdown">
                👤 {user?.username}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item disabled>
                  <small className="text-muted">{user?.email}</small>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>
                  🚪 Sair
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button variant="outline-light" as={Link} to="/login">
              Entrar
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
