export const filterPhone = phone => {
  const filtered = phone
    .split("")
    .filter(w => w !== " " && w !== "(" && w !== ")")
    .join("");

  return filtered;
};
