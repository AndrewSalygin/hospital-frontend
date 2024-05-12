import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

export const GreenFormCheck = styled(Form.Check)`
  & .form-check-input:checked {
    background-color: #146c43;
    border-color: #146c43;
  }

  & .form-check-input:active {
    background-color: #13653f;
    border-color: #13653f;
  }

  & .form-check-input:focus {
    box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25);
    border-color: #13653f;
  }
`;

export const GreenLink = styled(Link)`
    & {
        color: #13653f;
    }
`;

export const GreenFormControl = styled(Form.Control)`
    &:focus {
      box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25);
      border-color: #13653f;
    }
`;