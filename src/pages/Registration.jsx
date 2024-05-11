import React from "react";
import { Button, Card, Form, Container } from 'react-bootstrap';
import { BlackFormCheck, BlackLink, BlackFormControl } from '../styles/BlackForm.js';

export const Registration = () => {
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <Card className="p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Регистрация</h3>
        <Form>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <BlackFormControl
              type="email"
              placeholder="Введите email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Пароль</Form.Label>
            <BlackFormControl
              type="password"
              placeholder="Введите пароль"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="isDoctor">
            <BlackFormCheck
            type="checkbox"
            label="Вы врач?"
            />
          </Form.Group>
          <Button variant="dark" type="submit" className="mb-3">
            Зарегистрироваться
          </Button>
          <div className="text-center">
            <BlackLink to="/login">Авторизация</BlackLink>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Registration;