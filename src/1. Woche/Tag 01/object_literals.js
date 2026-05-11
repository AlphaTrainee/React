const x = 10;
const y = 20;

const pointOld = {
  x: x,
  y: y,
  move: function (dx, dy) {
    return { x: this.x + dx, y: this.y + dy };
  },
};
console.log(pointOld.move(1, 2));

// ES6
const pointNew = {
  x,
  y,
  move(dx, dy) {
    return { x: this.x + dx, y: this.y + dy };
  },
};
console.log(pointNew.move(1, 2));
