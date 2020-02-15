const mutationSum = list => {
  return list.Result.map(item => {
    item.sum = +item.sum.toString().replace(",", ".");
    return item;
  });
};

export const calculateBills = list => {
  if (!list || !list.Result) return;
  const newList = mutationSum(list);
  return (
    newList.reduce((total, item) => (total += item.sum * 100), 0) / 100
  ).toFixed(2);
};
