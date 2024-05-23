import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from '../../api/axiosConfig';
import { GreenFormControl, GreenFormCheck } from '../../styles/GreenForm';

const MedicationEdit = () => {
  const { medicationId } = useParams();
  const navigate = useNavigate();
  const [medication, setMedication] = useState(null);
  const [formData, setFormData] = useState({
    availableCount: 0,
    price: 0,
    dateOfManufacture: '',
    expireDate: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedication = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/medications/${medicationId}`);
        setMedication(response.data);
        setFormData({
          availableCount: response.data.availableCount,
          price: response.data.price,
          dateOfManufacture: response.data.dateOfManufacture,
          expireDate: response.data.expireDate
        });
        setLoading(false);
      } catch (error) {
        setError('Не удалось получить информацию о медикаменте');
        setLoading(false);
      }
    };

    fetchMedication();
  }, [medicationId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/admin-medications/update/${medicationId}`, formData);
      navigate('/admin/medications');
    } catch (error) {
      setError('Не удалось обновить информацию о медикаменте');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-3" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>Редактировать медикамент</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {medication && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="medicationName">
            <Form.Label className="mt-2">Название медикамента</Form.Label>
            <GreenFormControl
              type="text"
              readOnly
              defaultValue={medication.medicationName}
              disabled
              style={{ backgroundColor: "#18BB4E59" }}
            />
          </Form.Group>
          <Form.Group controlId="medicationForm">
            <Form.Label className="mt-2">Форма медикамента</Form.Label>
            <GreenFormControl
              type="text"
              readOnly
              defaultValue={medication.medicationForm}
              disabled
              style={{ backgroundColor: "#18BB4E59" }}
            />
          </Form.Group>
          <Form.Group controlId="dosage">
            <Form.Label className="mt-2">Дозировка</Form.Label>
            <GreenFormControl
              type="text"
              readOnly
              defaultValue={medication.dosage}
              disabled
              style={{ backgroundColor: "#18BB4E59" }}
            />
          </Form.Group>
          <Form.Group controlId="manufacturer">
            <Form.Label className="mt-2">Производитель</Form.Label>
            <GreenFormControl
              type="text"
              readOnly
              defaultValue={medication.manufacturer}
              disabled
              style={{ backgroundColor: "#18BB4E59" }}
            />
          </Form.Group>
          <Form.Group controlId="countryOfManufacture">
            <Form.Label className="mt-2">Страна производства</Form.Label>
            <GreenFormControl
              type="text"
              readOnly
              defaultValue={medication.countryOfManufacture}
              disabled
              style={{ backgroundColor: "#18BB4E59" }}
            />
          </Form.Group>
          <Form.Group controlId="isPrescription">
            <Form.Label className="mt-2">Рецептурный</Form.Label>
            <GreenFormCheck
              type="checkbox"
              checked={medication.isPrescription}
              readOnly
              disabled
            />
          </Form.Group>
          <Form.Group controlId="dateOfManufacture">
            <Form.Label className="mt-2">Дата производства</Form.Label>
            <GreenFormControl
              type="date"
              name="dateOfManufacture"
              value={formData.dateOfManufacture}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="expireDate">
            <Form.Label className="mt-2">Срок годности</Form.Label>
            <GreenFormControl
              type="date"
              name="expireDate"
              value={formData.expireDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label className="mt-2">Цена</Form.Label>
            <GreenFormControl
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="availableCount">
            <Form.Label className="mt-2">Доступное количество</Form.Label>
            <GreenFormControl
              type="number"
              name="availableCount"
              value={formData.availableCount}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="d-flex justify-content-between">
            <Button variant="success" type="submit" className="mt-3">
                Сохранить
            </Button>
            <Button variant="secondary" onClick={() => navigate('/admin/medications')} className="mt-3">
                Вернуться к списку медикаментов
            </Button>
        </div>
        </Form>
      )}
      
    </Container>
  );
};

export default MedicationEdit;
