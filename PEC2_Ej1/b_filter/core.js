function onlyEven(array) {
  return array.filter( x => !(x % 2));
}

function onlyOneWord(array) {
  let spaceRegex = /\s/g;
  return array.filter(x => !x.match(spaceRegex));
  //return array.filter( x => x.indexOf(' ') < 0);
}

function positiveRowsOnly(array) {
  //sin usar every
  //return array.filter(x => x.filter(y =>  y >= 0).length == 3);

  //with every: Beeter option because it will run for dinamyc array length
  return array.filter(x => x.every(y =>  y >= 0));
}

function allSameVowels(array) {
  return array.filter(x =>  x.match(/[aeiou]/gi).filter( (y,i,a)=> a.indexOf(y)===i).length == 1 );
}

module.exports = {
  onlyEven,
  onlyOneWord,
  positiveRowsOnly,
  allSameVowels
};
