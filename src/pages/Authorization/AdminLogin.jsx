import React from "react";
import { Button, Card, Form, Container } from 'react-bootstrap';
import { BlackFormControl } from '../../styles/BlackForm.js';

export const AdminLogin = () => {
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <Card className="p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Авторизация</h3>
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
          <Button variant="dark" type="submit" className="mb-3">
            Войти
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AdminLogin;