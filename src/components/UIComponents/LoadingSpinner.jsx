import React from 'react';
import { Container, Spinner } from 'react-bootstrap';

const LoadingSpinner = () => (
  <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <Spinner animation="border" role="status">
      <span className="sr-only" />
    </Spinner>
  </Container>
);

export default LoadingSpinner;