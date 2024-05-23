import React, { useEffect, useState } from 'react';
import { Button, Container, Alert, Form, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosConfig';
import PaginationComponent from '../../components/UIComponents/PaginationComponent';
import LoadingSpinner from '../../components/UIComponents/LoadingSpinner';
import '../../styles/greenPagination.css';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const MedicationsList = ({ isAdmin = false }) => {
  const [medications, setMedications] = useState([]);
  const [searchTerms, setSearchTerms] = useState({
    medicationName: '',
    medicationForm: '',
    manufacturer: '',
    countryOfManufacture: '',
  });
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const medicationsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedications = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/medications', {
          params: {
            limit: -1,
            offset: 0,
          },
        });
        setMedications(response.data);
        setTotalPages(Math.ceil(response.data.length / medicationsPerPage));
      } catch (error) {
        setError('Не удалось получить список медикаментов');
      } finally {
        setLoading(false);
      }
    };
    fetchMedications();
  }, []);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchTerms((prevTerms) => ({
      ...prevTerms,
      [name]: value,
    }));
  };

  const handleRowClick = (medicationId) => {
    const medicationPath = isAdmin
      ? `/admin/medications/${medicationId}`
      : `/medications/${medicationId}`;
    navigate(medicationPath);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
    } else {
      return <FaSort />;
    }
  };

  const sortedMedications = medications.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const handleDeleteMedication = async (medicationId) => {
    try {
      await axios.delete(`/admin-medications/${medicationId}`);
      setMedications(prevMedications =>
        prevMedications.filter(med => med.medicationId !== medicationId)
      );
    } catch (error) {
      setError('Не удалось удалить медикамент');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const filteredMedications = sortedMedications.filter((medication) =>
    Object.keys(searchTerms).every((key) =>
      medication[key]?.toString().toLowerCase().includes(searchTerms[key].toLowerCase())
    )
  );

  const currentMedications = filteredMedications.slice(
    (currentPage - 1) * medicationsPerPage,
    currentPage * medicationsPerPage
  );

  const backLink = isAdmin ? '/admin/dashboard' : '/dashboard';

  return (
    <Container className="mt-3">
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Поиск по названию медикамента..."
          name="medicationName"
          value={searchTerms.medicationName}
          onChange={handleSearchChange}
          className="mb-2"
        />
        <Form.Control
          type="text"
          placeholder="Поиск по форме медикамента..."
          name="medicationForm"
          value={searchTerms.medicationForm}
          onChange={handleSearchChange}
          className="mb-2"
        />
        <Form.Control
          type="text"
          placeholder="Поиск по производителю..."
          name="manufacturer"
          value={searchTerms.manufacturer}
          onChange={handleSearchChange}
          className="mb-2"
        />
        <Form.Control
          type="text"
          placeholder="Поиск по стране производителя..."
          name="countryOfManufacture"
          value={searchTerms.countryOfManufacture}
          onChange={handleSearchChange}
          className="mb-2"
        />
      </Form>
      {error && <Alert variant="danger">{error}</Alert>}
      {filteredMedications.length === 0 ? (
        <Alert variant="info">Нет медикаментов</Alert>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th onClick={() => handleSort('medicationName')}>
                  Название {getSortIcon('medicationName')}
                </th>
                <th onClick={() => handleSort('medicationForm')}>
                  Форма {getSortIcon('medicationForm')}
                </th>
                <th>Дозировка</th>
                <th onClick={() => handleSort('manufacturer')}>
                  Производитель {getSortIcon('manufacturer')}
                </th>
                <th onClick={() => handleSort('countryOfManufacture')}>
                  Страна производителя {getSortIcon('countryOfManufacture')}
                </th>
                <th onClick={() => handleSort('dateOfManufacture')}>
                  Дата производства {getSortIcon('dateOfManufacture')}
                </th>
                <th onClick={() => handleSort('expireDate')}>
                  Срок годности {getSortIcon('expireDate')}
                </th>
                <th>По рецепту</th>
                <th onClick={() => handleSort('price')}>
                  Цена {getSortIcon('price')}
                </th>
                <th onClick={() => handleSort('availableCount')}>
                  Доступное количество {getSortIcon('availableCount')}
                </th>
                {isAdmin && <th>Действия</th>}
              </tr>
            </thead>
            <tbody>
              {currentMedications.map((medication, index) => (
                <tr
                  key={medication.medicationId}
                  onClick={() => handleRowClick(medication.medicationId)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{(currentPage - 1) * medicationsPerPage + index + 1}</td>
                  <td>{medication.medicationName}</td>
                  <td>{medication.medicationForm}</td>
                  <td>{medication.dosage}</td>
                  <td>{medication.manufacturer}</td>
                  <td>{medication.countryOfManufacture}</td>
                  <td>{new Date(medication.dateOfManufacture).toLocaleDateString()}</td>
                  <td>{new Date(medication.expireDate).toLocaleDateString()}</td>
                  <td>{medication.isPrescription ? 'Да' : 'Нет'}</td>
                  <td>{medication.price}</td>
                  <td>{medication.availableCount}</td>
                  {isAdmin && (
                    <td>
                      <Button
                        variant="danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMedication(medication.medicationId);
                        }}
                      >
                        Удалить
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
          {totalPages > 1 && (
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default MedicationsList;
