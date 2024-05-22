import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';
import axios from '../../api/axiosConfig';
import useSpecializations from '../../hooks/useSpecializations';
import useDoctors from '../../hooks/useDoctors';
import { GreenFormCheck, GreenFormControl, GreenFormSelect } from '../../styles/GreenForm';
import { format } from 'date-fns';

const NewNote = ({ isAdmin = false }) => {
  const { patientId } = useParams();
  const navigate = useNavigate();

  const [noteData, setNoteData] = useState({
    patientId: patientId,
    doctorId: '',
    specializationId: '',
    initialAdmission: false,
    discharge: false,
    patientStatus: '',
    admissionDateTime: ''
  });

  const { specializations, loading: loadingSpecializations, error: errorSpecializations } = useSpecializations();
  const { doctors, loading: loadingDoctors, error: errorDoctors } = useDoctors(noteData.specializationId);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNoteData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRadioChange = (e) => {
    const { name } = e.target;
    setNoteData(prevState => ({
      ...prevState,
      initialAdmission: name === 'initialAdmission',
      discharge: name === 'discharge'
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = format(new Date(noteData.admissionDateTime), "yyyy-MM-dd'T'HH:mm:ssXXX");
      const dataToSubmit = { ...noteData, admissionDateTime: formattedDate };
      await axios.post('/admin-patients/journal/meeting', dataToSubmit);
      navigate(isAdmin ? `/admin/patients/${patientId}` : `/patients/${patientId}`);
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const formatExperience = (years) => {
    if (years % 10 === 1 && years % 100 !== 11) {
      return `${years} год`;
    } else if (years % 10 >= 2 && years % 10 <= 4 && (years % 100 < 10 || years % 100 >= 20)) {
      return `${years} года`;
    } else {
      return `${years} лет`;
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card className="shadow-lg border-0 rounded-3" style={{ maxWidth: '700px', width: '100%' }}>
        <Card.Body className="p-5">
          <h2 className="mb-4">Записать на прием</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="specializationId" className="mb-3">
              <Form.Label className="w-100">Специальность</Form.Label>
              <GreenFormSelect
                as="select"
                name="specializationId"
                value={noteData.specializationId}
                onChange={handleChange}
                required
                className="form-control-lg mb-3 w-100"
              >
                <option value="">Выберите специальность</option>
                {loadingSpecializations ? (
                  <option>Загрузка...</option>
                ) : (
                  specializations.map(spec => (
                    <option key={spec.specializationId} value={spec.specializationId}>{spec.specializationName}</option>
                  ))
                )}
              </GreenFormSelect>
              {errorSpecializations && <div className="text-danger">{errorSpecializations}</div>}
            </Form.Group>

            <Form.Group controlId="doctorId" className="mb-3">
              <Form.Label className="w-100">Доктор</Form.Label>
              <GreenFormSelect
                as="select"
                name="doctorId"
                value={noteData.doctorId}
                onChange={handleChange}
                required
                disabled={!noteData.specializationId}
                className="form-control-lg mb-3 w-100"
              >
                <option value="">Выберите доктора</option>
                {loadingDoctors ? (
                  <option>Загрузка...</option>
                ) : (
                  doctors.map(doc => (
                    <option key={doc.doctorId} value={doc.doctorId}>
                      {`${doc.firstName} ${doc.lastName} - стаж: ${formatExperience(doc.yearsOfExperience)}`}
                    </option>
                  ))
                )}
              </GreenFormSelect>
              {errorDoctors && <div className="text-danger">{errorDoctors}</div>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Выберите тип приема</Form.Label>
              <div>
                <GreenFormCheck
                  type="radio"
                  label="Первичный прием"
                  name="initialAdmission"
                  checked={noteData.initialAdmission}
                  onChange={handleRadioChange}
                  inline
                  className="mb-3 custom-check"
                />
                <GreenFormCheck
                  type="radio"
                  label="Выписка"
                  name="discharge"
                  checked={noteData.discharge}
                  onChange={handleRadioChange}
                  inline
                  className="mb-3 custom-check"
                />
              </div>
            </Form.Group>

            <Form.Group controlId="patientStatus" className="mb-3">
              <Form.Label className="w-100">Статус пациента</Form.Label>
              <GreenFormControl
                type="text"
                name="patientStatus"
                value={noteData.patientStatus}
                onChange={handleChange}
                required
                className="form-control-lg rounded-pill mb-3 w-100"
              />
            </Form.Group>

            <Form.Group controlId="admissionDateTime" className="mb-3">
              <Form.Label className="w-100">Дата и время приема</Form.Label>
              <GreenFormControl
                type="datetime-local"
                name="admissionDateTime"
                value={noteData.admissionDateTime}
                onChange={handleChange}
                required
                className="form-control-lg rounded-pill mb-3 w-100 datetime-picker"
              />
            </Form.Group>

            <Button variant="success" type="submit" className="rounded-pill w-100 mb-2">Записать</Button>
            <Button variant="secondary" onClick={handleBack} className="rounded-pill w-100">Вернуться назад</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NewNote;