import React from 'react';
import { Pagination } from 'react-bootstrap';
import '../../styles/PaginationComponent.css';

const PaginationComponent = ({ currentPage, totalPages, handlePageChange }) => {
  const visiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  let endPage = startPage + visiblePages - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - visiblePages + 1);
  }

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

  return (
    <div className="pagination-wrapper">
      <Pagination className="pagination-success mt-3">
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Назад
        </Pagination.Prev>
        {pages}
        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Вперёд
        </Pagination.Next>
      </Pagination>
    </div>
  );
};

export default React.memo(PaginationComponent);