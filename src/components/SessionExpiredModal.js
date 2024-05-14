import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SessionExpiredModal = ({ show, handleClose }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Session Expired</Modal.Title>
    </Modal.Header>
    <Modal.Body>Your session has expired. Please log in again.</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default SessionExpiredModal;