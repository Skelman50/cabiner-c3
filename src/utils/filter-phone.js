export const filterPhone = phone => {
  const filtered = phone.split("").filter(w => {
    if (w !== "+" || w !== " " || w !== "(" || w !== ")") {
      return w;
    }
  });
  console.log(filtered);
  return filtered;
};
