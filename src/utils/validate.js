import zxcvbn from 'zxcvbn';

export const isValidEmail = email => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

export const getPasswordStrength = password => {
  return zxcvbn(password).score;
};
