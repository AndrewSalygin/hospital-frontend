import styled from 'styled-components';
import { NavDropdown } from 'react-bootstrap';

export const GreenNavDropdownItem = styled(NavDropdown.Item)`
  &.dropdown-item {
    color: black;
  }

  &.dropdown-item:hover,
  &.dropdown-item:focus,
  &.dropdown-item:active {
    background-color: #13653f;
    color: white;
  }
`;