import styled from 'styled-components/macro';

export const Fieldset = styled.fieldset`
  margin: 15px 0;
  padding: 10px;
  border: none;
  border-radius: 20px;
  box-shadow: -3px -3px 5px var(--nearWhite), 3px 3px 3px var(--shadow);
`;

export const FieldsetTitle = styled.h3`
  margin: 5px 0;
`;

export const Label = styled.label`
  font-size: 0.9em;
  display: flex;
  flex-direction: row;
  margin: 5px 0;
  flex-basis: auto;
  & > div {
    min-width: 20%;
    display: flex;
    align-items: center;
    @media (max-width: 576px) {
      min-width: 40%;
    }
  }
`;

export const Input = styled.input`
  flex-grow: 1;
  border-radius: 20px;
  padding: 8px 15px;
  box-shadow: ${props =>
    props.readOnly ? 'none' : 'inset -3px -3px 5px var(--nearWhite), inset 3px 3px 3px var(--shadow)'};
`;

export const Select = styled.select`
  flex-grow: 1;
  border-radius: 20px;
  padding: 8px 15px;
  box-shadow: inset -3px -3px 5px var(--nearWhite), inset 3px 3px 3px var(--shadow);
`;
