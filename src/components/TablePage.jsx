import React from 'react';
import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

const TablePage = ({ patients, buttonName, buttonLink, titleName, ListComponent }) => {
  return (
    <Container className="mt-4" style={{ maxWidth: '1200px', width: '100%' }}>
      <h1>{ titleName }</h1>
      <ListComponent patients={ patients } />

      <div className="col text-center">
        <Link to={ buttonLink } style={{ textDecoration: 'none' }}>
          <Button variant="success" className="mt-3 mb-3">
            { buttonName }
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default TablePage;