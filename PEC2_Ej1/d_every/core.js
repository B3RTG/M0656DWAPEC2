// Check to see if all elements in an array
// are even numbers.

function allEven(input) {
  return input.every(x => (x % 2) == 0);
}

// Check to see if all elements in an array
// are of the same type.

function allSameType(input) {
  return input.every((x, _, a) => typeof x === typeof a[0]);
}

// Check to see if every element in the matrix is
// an array and that every element in the array is
// greater than 0.

function positiveMatrix(input) {
  return input.every(x=> Array.isArray(x) && x.every(y=> y > 0));
}

// Check that all items in an array are strings
// and that they all only contain the same vowels.

function allSameVowels(input) {
  return input.every(x=> typeof x == 'string' && x.match(/[aeiou]/gi).every( (y,i,a)=> y == a[0]))
}

module.exports = {
  allEven,
  allSameType,
  positiveMatrix,
  allSameVowels
};
