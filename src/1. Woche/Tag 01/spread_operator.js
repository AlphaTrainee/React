const a = [1, 2, 3];
const b = [...a, 4];
console.log(b);

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, b: 99, c: 3 };
console.log(obj2);

{
  const a = [1, 2, 3];
  const b = a;
}
