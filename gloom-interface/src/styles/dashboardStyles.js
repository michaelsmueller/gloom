import styled from 'styled-components/macro';

const Container = styled.div`
  width: 640px;

  @media (max-width: 576px) {
    max-width: 100vw;
    padding: 0 20px;
  }
`;

export default Container;
