import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1>404</h1>
      <h2>Страница не найдена</h2>
      <Button as={Link} to="/" variant="success" className="mt-3">
        Вернуться на главную
      </Button>
    </Container>
  );
};

export default NotFound;