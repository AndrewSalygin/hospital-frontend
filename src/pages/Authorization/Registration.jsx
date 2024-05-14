import React from "react";
import { Button, Card, Form, Container, Alert } from 'react-bootstrap';
import { GreenFormCheck, GreenLink, GreenFormControl } from '../../styles/GreenForm.js';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const RegistrationSchema = Yup.object().shape({
  email: Yup.string().email('Неверный формат email').required('Обязательно'),
  password: Yup.string().min(6, 'Минимум 6 символов').required('Обязательно'),
  isDoctor: Yup.boolean()
});

export const Registration = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <Card className="p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Регистрация</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Formik
          initialValues={{ email: '', password: '', isDoctor: false }}
          validationSchema={RegistrationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const response = await axios.post('/auth/registration', {
                email: values.email,
                password: values.password,
                role: values.isDoctor ? 'DOCTOR' : 'PATIENT'
              });
              const token = response.data.jwtToken;
              console.log(token)
              const decoded = jwtDecode(token);
              console.log(decoded)
              
              if (decoded.role === 'PATIENT' || decoded.role === 'DOCTOR') {
                localStorage.setItem('token', token);
                navigate('/patients');
              } else {
                setError('Недостаточно прав для доступа');
              }
            } catch (error) {
              setError(error.response?.data?.message || 'Ошибка регистрации');
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
                <GreenFormControl
                  type="email"
                  name="email"
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
                <GreenFormControl
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  isInvalid={touched.password && !!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="isDoctor">
                <GreenFormCheck
                  type="checkbox"
                  name="isDoctor"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  checked={values.isDoctor}
                  label="Вы врач?"
                />
              </Form.Group>
              <Button variant="success" type="submit" className="mb-3" disabled={isSubmitting}>
                Зарегистрироваться
              </Button>
              <div className="text-center">
                <GreenLink to="/login">Авторизация</GreenLink>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
};

export default Registration;