export const validatePalindrome = (value) => {
  const reverse = value.toLowerCase().split('').reverse().join('');

  return reverse === value.toLowerCase();
};

export const validateLength = (value) => value.length > 2;
