import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

const AddMedication = ({ onMedicationAdded }) => {
  const [formData, setFormData] = useState({
    medicationName: '',
    medicationForm: '',
    dosage: '',
    manufacturer: '',
    countryOfManufacture: '',
    dateOfManufacture: '',
    expireDate: '',
    isPrescription: false,
    price: 0,
    availableCount: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/admin-medications', formData);
      onMedicationAdded();
      navigate('/admin/medications');
    } catch (error) {
      setError('Не удалось добавить медикамент');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-3" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>Добавить новый медикамент</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="medicationName">
          <Form.Label className="mt-2">Название медикамента</Form.Label>
          <Form.Control
            type="text"
            name="medicationName"
            value={formData.medicationName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="medicationForm">
          <Form.Label className="mt-2">Форма медикамента</Form.Label>
          <Form.Control
            type="text"
            name="medicationForm"
            value={formData.medicationForm}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="dosage">
          <Form.Label className="mt-2">Дозировка</Form.Label>
          <Form.Control
            type="text"
            name="dosage"
            value={formData.dosage}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="manufacturer">
          <Form.Label className="mt-2">Производитель</Form.Label>
          <Form.Control
            type="text"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="countryOfManufacture">
          <Form.Label className="mt-2">Страна производства</Form.Label>
          <Form.Control
            type="text"
            name="countryOfManufacture"
            value={formData.countryOfManufacture}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="dateOfManufacture">
          <Form.Label className="mt-2">Дата производства</Form.Label>
          <Form.Control
            type="date"
            name="dateOfManufacture"
            value={formData.dateOfManufacture}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="expireDate">
          <Form.Label className="mt-2">Срок годности</Form.Label>
          <Form.Control
            type="date"
            name="expireDate"
            value={formData.expireDate}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="isPrescription">
          <Form.Label className="mt-2">Рецептурный</Form.Label>
          <Form.Check
            type="checkbox"
            name="isPrescription"
            checked={formData.isPrescription}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Цена</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="availableCount">
          <Form.Label className="mt-2">Доступное количество</Form.Label>
          <Form.Control
            type="number"
            name="availableCount"
            value={formData.availableCount}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button className="mt-3" variant="success" type="submit" disabled={loading}>
          {loading ? 'Загрузка...' : 'Добавить'}
        </Button>
      </Form>
    </Container>
  );
};

export default AddMedication;
