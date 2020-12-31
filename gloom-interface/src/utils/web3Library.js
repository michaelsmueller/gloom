import { Web3Provider } from '@ethersproject/providers';

export const getLibrary = provider => {
  return new Web3Provider(provider);
};

export const getSigner = library => {
  const provider = new Web3Provider(library.provider);
  return provider.getSigner();
};
