import React, { createContext, useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import LoadingOverlay from 'react-loading-overlay';

export const LoadingContext = createContext();

const StyledLoader = styled(LoadingOverlay)`
  width: 100vw;
  min-height: 100vh;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function LoadingContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => setIsLoading(false), [setIsLoading]);
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      <StyledLoader active={isLoading}>{children}</StyledLoader>
    </LoadingContext.Provider>
  );
}
