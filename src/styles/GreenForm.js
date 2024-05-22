import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

  & .form-check-input {
    transform: scale(1.15); /* Увеличивает размер чекбоксов */
  }
`;

export const GreenLink = styled(Link)`
  & {
    color: #13653f;
  }
`;

export const GreenFormControl = styled(Form.Control)`
  border-radius: 0.5rem; /* Закругленные углы */
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25);
    border-color: #13653f;
  }
`;

export const GreenFormSelect = styled(Form.Control)`
  border-radius: 0.5rem; /* Закругленные углы */
  padding-right: 2.5rem; /* Увеличивает пространство для стрелочки */
  background-position: calc(100% - 1rem) center; /* Перемещает стрелочку левее */
  &:focus {
    box-shadow: 0 0 0 0.2rem rgba(25, 135, 84, 0.25);
    border-color: #13653f;
  }
  & option {
    border: none; /* Убирает черную рамку у опций */
  }

  & {
    border-color: #DEE2E6; 
  }
`;