import styled from 'styled-components/macro';

const NavBar = styled.div`
  font-size: 0.8em;
  font-weight: 600;

  & > button {
    padding: 5px 0;
    margin: 10px;
    text-transform: uppercase;
    transition: 0.1s ease-out;

    &:hover {
      cursor: pointer;
      color: var(--primary);
    }
  }
`;

export default NavBar;
