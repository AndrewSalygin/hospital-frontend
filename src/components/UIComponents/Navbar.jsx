import React from 'react';
import { Navbar, Nav, Button, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { GreenNavDropdownItem } from '../../styles/GreenNavDropdownItem.js';

const CustomNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const token = localStorage.getItem('token');
  let userRole = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userRole = decoded.role;
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  const isAuthenticated = !!token; // Проверка наличия токена

  return (
    <Navbar bg="success" variant="dark" expand="lg" style={{ backgroundColor: '#146c43' }}>
      <Container>
        <Navbar.Brand href="/">Медицинская система</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end mt-lg-0 mt-3">
          <Nav className="align-items-lg-center" style={{ gap: '1rem' }}>
            {isAuthenticated && (userRole === 'SUPER-ADMIN' || userRole === 'ADMIN') && (
              <Nav.Link href="/admin/medications">Медикаменты</Nav.Link>
            )}
            {isAuthenticated && userRole === 'SUPER-ADMIN' && (
              <Nav.Link href="/super-admin/users">Пользователи</Nav.Link>
            )}
            {isAuthenticated && (userRole === 'SUPER-ADMIN' || userRole === 'ADMIN') && (
              <NavDropdown title="Пациенты" id="patients-dropdown">
                <GreenNavDropdownItem href="/admin/patients">Текущие пациенты</GreenNavDropdownItem>
                <GreenNavDropdownItem href="/admin/patients/trash">Пациенты в архиве</GreenNavDropdownItem>
              </NavDropdown>
            )}
            {isAuthenticated && userRole === 'DOCTOR' && (
              <Nav.Link href="/patients">Пациенты</Nav.Link>
            )}
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