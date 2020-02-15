export const getIsoTime = date => {
  return new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();
};
