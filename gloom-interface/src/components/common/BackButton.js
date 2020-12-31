import React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';

const Icon = styled.i`
  font-size: 12px;
  font-weight: 600;
  transition: 0.1s ease-out;

  &:hover {
    color: var(--primary);
    cursor: pointer;
  }
`;

export default function BackButton() {
  const history = useHistory();
  return (
    <Icon
      role='button'
      onKeyDown={e => {
        if (e.key !== 'Tab') history.goBack();
      }}
      onClick={() => history.goBack()}
      tabIndex={0}
      className='material-icons-round'
    >
      arrow_back
    </Icon>
  );
}
