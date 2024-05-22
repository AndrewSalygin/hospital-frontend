import React from 'react';
import { Container, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ForbiddenPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Container className="mt-5">
      <Alert variant="danger">
        <Alert.Heading>Доступ запрещен</Alert.Heading>
        <p>
          У вас нет прав для доступа к этой странице. Пожалуйста, свяжитесь с администратором, если считаете, что это ошибка.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={handleGoBack} variant="outline-danger">
            Вернуться на главную
          </Button>
        </div>
      </Alert>
    </Container>
  );
};

export default ForbiddenPage;