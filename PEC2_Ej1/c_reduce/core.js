function sum(array) {
  return array.reduce((accumulator, currentValue) => accumulator + currentValue);
}

function productAll(array) {
  //put all in one array an with reduce + concat and then reduce with product
  return array.reduce((x,y) => x.concat(y)).reduce((x,y) => x*y);
}

function objectify(array) {
  return array.reduce((x, y) => {
                        x[y[0]] = y[1];
                        return x;
                      }, {});
}

function luckyNumbers(array) {
  //added a ',' for the 'and' condition to pass test, i'm not sure if it's correct
  return 'Your lucky numbers are: ' + array.reduce((x,y,i,a) => (i < a.length - 1) ? x +', ' + y : x +', and ' + y);
}

module.exports = {
  sum,
  productAll,
  objectify,
  luckyNumbers
};
