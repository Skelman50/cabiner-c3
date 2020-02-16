export const setValue = value => {
  if (value.includes("січня")) {
    const result = value.replace("січня", "січень");
    return result;
  }
  if (value.includes("лютого")) {
    const result = value.replace("лютого", "лютий");
    return result;
  }
  if (value.includes("березня")) {
    const result = value.replace("березня", "березень");
    return result;
  }
  if (value.includes("квітня")) {
    const result = value.replace("квітня", "квітень");
    return result;
  }
  if (value.includes("травня")) {
    const result = value.replace("травня", "травень");
    return result;
  }
  if (value.includes("червня")) {
    const result = value.replace("червня", "червень");
    return result;
  }
  if (value.includes("липня")) {
    const result = value.replace("липня", "липень");
    return result;
  }
  if (value.includes("серпня")) {
    const result = value.replace("серпня", "серпень");
    return result;
  }
  if (value.includes("вересня")) {
    const result = value.replace("вересня", "вересень");
    return result;
  }
  if (value.includes("жовтня")) {
    const result = value.replace("жовтня", "жовтень");
    return result;
  }
  if (value.includes("листопада")) {
    const result = value.replace("листопада", "листопад");
    return result;
  }
  if (value.includes("грудня")) {
    const result = value.replace("грудня", "грудень");
    return result;
  }
};
