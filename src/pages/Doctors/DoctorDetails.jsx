import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';
import DoctorDetailsComponent from '../../components/Doctors/DoctorDetailsComponent';
import { useDoctor } from '../../context/DoctorContext';
import useDoctorData from '../../hooks/useDoctors';
import LoadingSpinner from '../../components/UIComponents/LoadingSpinner';
import ErrorAlert from '../../components/Doctors/ErrorAlertDoctorNotFound';
import { useAuth } from '../../context/AuthContext';

const DoctorDetails = ({ isAdmin = false }) => {
  const { doctorId } = useParams();
  const { state } = useLocation();
  const { doctor, setDoctor } = useDoctor();
  const { loading, error } = useDoctorData({ doctorId, setDoctor });
  const { role } = useAuth(); // Получаем роль из контекста аутентификации

  const isSuperAdmin = role === 'SUPER-ADMIN';

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorAlert message="Пожалуйста, проверьте идентификатор врача или попробуйте еще раз." />;
  }

  if (!doctor) {
    return <ErrorAlert message="Врач не найден." />;
  }

  const backLink = state?.fromTrash ? '/admin/doctors/trash' : isAdmin ? "/admin/doctors" : "/doctors";
  const specializationsLink = `/doctors/specializations/${doctorId}`;

  return (
    <Container className="mt-5 mb-5 d-flex justify-content-center">
      <Card className="shadow-lg border-0 rounded-3" style={{ maxWidth: '700px', width: '100%' }}>
        <DoctorDetailsComponent doctor={doctor} />
        <Card.Body className="p-5 pt-0">
          <div className="d-flex justify-content-between flex-wrap">
            {!doctor.isDeleted && isSuperAdmin && (
              <Button
                variant="success"
                as={Link}
                to={`/admin/doctors/${doctorId}/edit`}
                className="px-4 py-2 rounded-pill mb-2"
              >
                Изменить информацию
              </Button>
            )}
            <Button
              variant="secondary"
              as={Link}
              to={backLink}
              className="px-4 py-2 rounded-pill mb-2"
            >
              Вернуться
            </Button>
          </div>
          <div className="mt-3">
            <Button
              variant="info"
              as={Link}
              to={specializationsLink}
              className="px-4 py-2 rounded-pill"
            >
              Посмотреть специализации врача
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DoctorDetails;