import styled from 'styled-components/macro';

export const Button = styled.button`
  margin: 10px 5px;
  padding: 10px;
  border-radius: 20px;
  ${'' /* box-shadow: -3px -3px 5px var(--nearWhite), 3px 3px 3px var(--shadow); */}
  font-weight: 600;
  font-size: ${props => (props.large ? '1.1em' : '0.8em')};
  transition: 0.1s ease-out;

  color: ${props => (props.active ? 'var(--primary)' : null)};
  box-shadow: ${props => (props.inactive ? null : '-3px -3px 5px var(--nearWhite), 3px 3px 3px var(--shadow);')};

  &:hover {
    cursor: pointer;
    color: var(--primary);
  }

  &:active {
    color: var(--primary);
    box-shadow: inset -3px -3px 5px var(--nearWhite), inset 3px 3px 3px var(--shadow);
  }
`;

export const ConnectButton = styled.button`
  padding: 7px 10px;
  border-radius: 20px;
  font-weight: 600;
  font-size: 1.2em;
  transition: 0.1s ease-out;

  &:hover {
    cursor: pointer;
    color: var(--primary);
  }

  &:active {
    color: var(--primary);
  }
`;
