import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

export const BlackFormCheck = styled(Form.Check)`
  & .form-check-input:checked {
    background-color: black;
    border-color: black;
  }

  & .form-check-input:active {
    background-color: black;
    border-color: black;
  }

  & .form-check-input:focus {
    box-shadow: 0 0 0 0.2rem rgba(0, 0, 0, 0.25);
    border-color: black;
  }
`;

export const BlackLink = styled(Link)`
    & {
        color: black;
    }
`;

export const BlackFormControl = styled(Form.Control)`
    &:focus {
        box-shadow: 0 0 0 0.2rem rgba(0, 0, 0, 0.25);  // Применяется только при фокусе
        border-color: black;
    }
`;