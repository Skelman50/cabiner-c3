export const validateEmail = email => {
  const pattern = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;
  const result = pattern.test(email);
  if (result) {
    return true;
  } else {
    return false;
  }
};
