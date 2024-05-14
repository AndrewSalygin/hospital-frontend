import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const CustomNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const isAuthenticated = !!localStorage.getItem('token'); // Проверка наличия токена

  return (
    <Navbar bg="success" variant="dark" expand="lg" style={{ backgroundColor: '#146c43' }}>
      <Container>
        <Navbar.Brand href="/">Медицинская система</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end mt-lg-0 mt-3">
          <Nav>
            {isAuthenticated && (
              <Button variant="outline-light" onClick={handleLogout}>Выйти</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;