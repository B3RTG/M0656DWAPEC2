const { Console } = require("console");

function multiplyBy10(array) {
  return array.map(x => x*10);
}

function shiftRight(array) {
  return array.map((_, i, a) => a[(i + a.length - 1) % a.length]);
}

function onlyVowels(array) {
  return array.map( x =>  x.match(/[aeiou]/gi).join(''));
}

function doubleMatrix(array) {  
  return array.map(x=> x.map(y => y*2));
}

module.exports = {
  multiplyBy10,
  shiftRight,
  onlyVowels,
  doubleMatrix
};
