import React from 'react';
import { Container, Alert, Table, Form, Button, Pagination } from 'react-bootstrap';
import useUsers from '../../hooks/useUsers';
import LoadingSpinner from '../../components/UIComponents/LoadingSpinner';
import '../../styles/greenPagination.css';

const UsersListAdmin = () => {
  const {
    users,
    searchTerm,
    setSearchTerm,
    currentPage,
    totalPages,
    setCurrentPage,
    handleChangeRights,
    handleDelete,
    loading,
    error
  } = useUsers({ limit: -1 });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container className="mt-3">
      <Form.Control
        type="text"
        placeholder="Поиск по любому полю..."
        className="mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Роль</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.userId}>
              <td>{index + 1}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {user.role !== 'ADMIN' && (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleChangeRights(user.userId, 'ADMIN')}
                    className="me-2"
                  >
                    Сделать админом
                  </Button>
                )}
                {user.role !== 'DOCTOR' && (
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleChangeRights(user.userId, 'DOCTOR')}
                    className="me-2"
                  >
                    Сделать врачом
                  </Button>
                )}
                {user.role !== 'PATIENT' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleChangeRights(user.userId, 'PATIENT')}
                    className="me-2"
                  >
                    Сделать пациентом
                  </Button>
                )}
                <Button variant="danger" size="sm" onClick={() => handleDelete(user.userId)}>
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination className="pagination-success mt-3">
        <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Назад
        </Pagination.Prev>
        {[...Array(totalPages).keys()].map((page) => (
          <Pagination.Item key={page + 1} active={page + 1 === currentPage} onClick={() => setCurrentPage(page + 1)}>
            {page + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Вперёд
        </Pagination.Next>
      </Pagination>
    </Container>
  );
};

export default UsersListAdmin;