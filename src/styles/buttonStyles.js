import styled from 'styled-components/macro';

const Button = styled.button`
  margin: 15px 5px;
  padding: 15px;
  border-radius: 20px;
  box-shadow: -3px -3px 5px var(--nearWhite), 3px 3px 3px var(--shadow);
  font-size: 0.8em;
  font-weight: 700;

  &:hover {
    cursor: pointer;
    color: var(--primary);
  }

  &:active {
    color: var(--primary);
    box-shadow: inset -3px -3px 5px var(--nearWhite), inset 3px 3px 3px var(--shadow);
  }
`;

export default Button;
