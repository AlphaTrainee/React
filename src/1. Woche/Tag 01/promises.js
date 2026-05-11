/* 
    ist relevant für asynchrones Programmieren

*/

const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Fertig nach ${ms}ms`), ms);
  });
};

wait(10)
  .then((msg) => console.log(msg))
  .catch((err) => console.log(`Fehler: ${err}`));

console.log("Hello World");
console.log("Hello World");
console.log("Hello World");
console.log("Hello World");
console.log("Hello World");
setTimeout(() => `Fertig nach 50ms`, 50);
console.log("Hello World");
console.log("Hello World");
console.log("Hello World");
console.log("Hello World");

/* 
    Baue wait so um, dass es mit reject abbricht
*/
