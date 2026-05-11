const user = { id: 7, username: "neo", city: "Berlin" };
const { id, city } = user;
const { username: name } = user;

console.log(name);
console.log(id, city);

const rgb = [255, 100, 50];
const [red, green, blue] = rgb;
console.log(red, green, blue);
