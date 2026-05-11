const key = "score";
const value = 88;

const result = {
  [key]: value,
  ["level" + 1]: "easy",
};

console.log(result);
