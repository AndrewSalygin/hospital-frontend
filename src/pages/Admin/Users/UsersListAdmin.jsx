import React, { useState, useEffect } from 'react';
import { Table, Form, Pagination, Button } from 'react-bootstrap';
import '../../../styles/greenPagination.css';

const UsersListAdmin = ({ users, deleteUser, changeRights }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users || []);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const visiblePages = 5;

  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const visibleUsers = users.filter(
      (user) =>
        !user.isDeleted &&
        Object.values(user).join(' ').toLowerCase().includes(lowercasedTerm)
    );
    setFilteredUsers(visibleUsers);
  }, [searchTerm, users]);

  const indexOfLastPatient = currentPage * usersPerPage;
  const indexOfFirstPatient = indexOfLastPatient - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Pagination controls
  const goToPreviousPage = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  // Determine the range of page numbers to display
  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  let endPage = startPage + visiblePages - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

  // Create a range of page numbers to render
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  // Button click handler for changing user rights
  const handleChangeRights = (userId, newRole) => {
    changeRights(userId, newRole);
  };

  const handleDelete = (userId) => {
    deleteUser(userId);
  };

  // Function to render the appropriate role buttons
  const renderRoleButtons = (user) => {
    const buttons = [];
    if (user.role === 'NEW') {
      buttons.push(
        <Button variant="success" size="sm" onClick={() => handleChangeRights(user.userId, 'ADMIN')} className="me-2">
          Сделать админом
        </Button>
      );
      buttons.push(
        <Button variant="info" size="sm" onClick={() => handleChangeRights(user.userId, 'USER')} className="me-2">
          Сделать врачом
        </Button>
      );
    } else if (user.role === 'ADMIN') {
      buttons.push(
        <Button variant="info" size="sm" onClick={() => handleChangeRights(user.userId, 'USER')} className="me-2">
          Сделать врачом
        </Button>
      );
    } else if (user.role === 'USER') {
      buttons.push(
        <Button variant="success" size="sm" onClick={() => handleChangeRights(user.userId, 'ADMIN')} className="me-2">
          Сделать админом
        </Button>
      );
    }

    return buttons;
  };

  return (
    <div className="container mt-3">
      <Form.Control
        type="text"
        placeholder="Поиск по любому полю..."
        className="mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

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
          {currentUsers.map((user, index) => (
            <tr key={user.userId}>
              <td>{indexOfFirstPatient + index + 1}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                {renderRoleButtons(user)}
                <Button variant="danger" size="sm" onClick={() => handleDelete(user.userId)}>
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination className="pagination-success mt-3">
        <Pagination.Prev onClick={goToPreviousPage} disabled={currentPage === 1}>
          Назад
        </Pagination.Prev>
        {pages}
        <Pagination.Next onClick={goToNextPage} disabled={currentPage === totalPages}>
          Вперёд
        </Pagination.Next>
      </Pagination>
    </div>
  );
};

export default UsersListAdmin;