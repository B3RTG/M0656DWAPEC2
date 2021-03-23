//declaración de una función que recibe 3 parametros
// list --> array de elementos
// {Key, value} --> objecto con dos propiedades, clave/valor
// { onSuccess, onError } --> funciones "callback" a ejecutar en caso de encontrar o no el parametro dos en el parametro de lista 1
const findOne = (list, { key, value }, { onSuccess, onError }) => {
  //setear un timer con 2 segundos de delay
  setTimeout(() => {
    //realizar busqueda de validación en lista
    const element = list.find(element => element[key] === value);
    // si es correcto, lanza la funcion onSuccess sino, onError
    element ? onSuccess(element) : onError({ msg: 'ERROR: Element Not Found' });
  }, 2000);
};

// Creación de las función que servirán como callback en caso correcto/erroneo
// al realizar las llamadas a findOne.
const onSuccess = ({ name }) => console.log(`user: ${name}`);
const onError = ({ msg }) => console.log(msg);

// preparar el array de datos para realizar las llamadas
const users = [
  {
    name: 'Carlos',
    rol: 'Teacher'
  },
  {
    name: 'Ana',
    rol: 'Boss'
  }
];

//escribir en consola texto de referencia
console.log('findOne success');
// Lanzar la función "findOne" con una validación correcta. En la llamada, a parte
// de la lista de datos, se está pasando las funciones "callback" para las operaciones de validación
// o error. Será correcta ya que carlos si existe en el array de datos user
findOne(users, { key: 'name', value: 'Carlos' }, { onSuccess, onError });

//escribir en consola texto de referencia
console.log('findOne error');
// Lanzar la función "findOne" con una validación correcta. En la llamada, a parte
// de la lista de datos, se está pasando las funciones "callback" para las operaciones de validación
// o error. Será erronea ya que fermin no existe en el array de datos user
findOne(users, { key: 'name', value: 'Fermin' }, { onSuccess, onError });

/*
findOne success
findOne error
 //wait 2 seconds
user: Carlos
ERROR: Element Not Found
*/
