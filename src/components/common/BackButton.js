import React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';

const Back = styled.div`
  border: 2px solid var(--textPrimary);
  font-size: 12px;
  font-weight: 600;
  border-radius: 6px;
  height: 25px;
  width: 55px;
  line-height: 20px;
  margin: 2em 0;
  text-align: center;
  transition: 0.5s ease-out;

  &:hover {
    color: var(--primary);
    cursor: pointer;
    border: 2px solid var(--primary);
  }
`;

export default function BackButton() {
  const history = useHistory();
  return <Back onClick={() => history.goBack()}>← back</Back>;
}
