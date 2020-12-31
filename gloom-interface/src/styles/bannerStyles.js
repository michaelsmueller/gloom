import styled from 'styled-components/macro';

export const Container = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 60px;
  width: 100vw;
  background: var(--gloomBlue);
`;

export const Content = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--nearWhite);
  padding: 0 20px;
`;

export const Logo = styled.img`
  width: 120px;
  @media (max-width: 576px) {
    width: 80px;
  }
`;

export const Account = styled.pre`
  font-size: 0.9em;
  @media (max-width: 576px) {
    font-size: 0.7em;
  }
`;

export const Network = styled.pre`
  font-size: 0.9em;
  @media (max-width: 576px) {
    font-size: 0.7em;
  }
`;
