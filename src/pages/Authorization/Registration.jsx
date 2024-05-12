import React from "react";
import { Button, Card, Form, Container } from 'react-bootstrap';
import { GreenFormCheck, GreenLink, GreenFormControl } from '../../styles/GreenForm.js';

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
            <GreenFormControl
              type="email"
              placeholder="Введите email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Пароль</Form.Label>
            <GreenFormControl
              type="password"
              placeholder="Введите пароль"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="isDoctor">
            <GreenFormCheck
            type="checkbox"
            label="Вы врач?"
            />
          </Form.Group>
          <Button variant="success" type="submit" className="mb-3">
            Зарегистрироваться
          </Button>
          <div className="text-center">
            <GreenLink to="/login">Авторизация</GreenLink>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Registration;