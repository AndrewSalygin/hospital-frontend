import React from 'react';
import { Container } from "react-bootstrap";

const TablePage = ({ patients, users, changeRights, deleteUser, deletePatient, unDeletePatient, buttonName, buttonLink, titleName, ListComponent }) => {
  return (
    <Container className="mt-4" style={{ maxWidth: '1200px', width: '100%' }}>
      <h1>{ titleName }</h1>
      <ListComponent patients={ patients } users = { users } changeRights={ changeRights } deleteUser = { deleteUser } deletePatient={deletePatient} unDeletePatient={unDeletePatient} buttonName = { buttonName } buttonLink = { buttonLink } />
    </Container>
  );
};

export default TablePage;