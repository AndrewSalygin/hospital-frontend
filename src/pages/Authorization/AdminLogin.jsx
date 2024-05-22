import React, { useState } from "react";
import { Button, Card, Form, Container, Alert } from 'react-bootstrap';
import { BlackFormControl } from '../../styles/BlackForm.js';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Неверный формат email').required('Обязательно'),
  password: Yup.string().min(6, 'Минимум 6 символов').required('Обязательно'),
});

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <Card className="p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Авторизация</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await axios.post('/auth/login', values);
              const token = response.data.jwtToken;
              const decoded = jwtDecode(token);

              if (decoded.role === 'ADMIN') {
                localStorage.setItem('token', token);
                navigate('/admin/patients');
              } else {
                setError('Недостаточно прав для доступа');
              }
            } catch (error) {
              setError(error.response?.data?.message || 'Ошибка авторизации');
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <BlackFormControl
                  type="email"
                  name="email"
                  placeholder="Введите email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  isInvalid={touched.email && !!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Пароль</Form.Label>
                <BlackFormControl
                  type="password"
                  name="password"
                  placeholder="Введите пароль"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  isInvalid={touched.password && !!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="dark" type="submit" className="mb-3" disabled={isSubmitting}>
                Войти
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

export default AdminLogin;