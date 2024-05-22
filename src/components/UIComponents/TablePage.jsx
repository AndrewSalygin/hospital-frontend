import React from 'react';
import { Container } from "react-bootstrap";
import './../../styles/TablePage.css';

const TablePage = ({ data, buttonName, buttonLink, titleName, ListComponent }) => {
  return (
    <Container className="mt-4" style={{ maxWidth: '1200px', width: '100%' }}>
      <h1 className="table-page-title">{ titleName }</h1>
      <ListComponent 
        {...data}
        buttonName={buttonName}
        buttonLink={buttonLink}
      />
    </Container>
  );
};

export default TablePage;