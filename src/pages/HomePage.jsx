import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <Container className="home-page-container">
      <h1 className="home-page-title">Добро пожаловать в Медицинскую систему</h1>
      <p className="home-page-text">Управляйте вашим медицинским учреждением с легкостью.</p>
      <div className="home-page-buttons">
        <Button variant="success" as={Link} to="/login" className="home-page-button">
          Войти
        </Button>
        <Button variant="secondary" as={Link} to="/register" className="home-page-button">
          Регистрация
        </Button>
      </div>
    </Container>
  );
};

export default HomePage;