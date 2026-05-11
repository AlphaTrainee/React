const sum = (...nums) => {
  let result = 0;
  for (const i of nums) result += i;
  return result;
};

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4)); // 10
