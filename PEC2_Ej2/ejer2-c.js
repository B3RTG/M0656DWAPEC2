/*
* creamos la función con el await para poder ser usada con el async.
* SetTimeout lo creamos como una promise para hacer el efecto de eseprar 2 segundos
*/
const findOne = async function(list, { key, value }) {

  await new Promise( (resolve) => setTimeout(() => resolve(), 2000));
  
  //búsqueda en lista
  const element = list.find(element => element[key] === value);
  if(element) return element;
  else throw new Error('ERROR: Element Not Found' );         
}

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

// creamos una funcion "async" para poder hacer las llamadas con await a la busqueda
// esta será llamada posteriormente para ejecutar las acciones
const init = async () => {
  console.log('findOne success');
  try
  {
    const item = await findOne(users, { key: 'name', value: 'Carlos' });
    onSuccess(item);
  } catch (err) {
    onError(err);
  }
  
  console.log('findOne error');
  try
  {
    const item = await findOne(users, { key: 'name', value: 'Fermin' });
    onSuccess(item);
  } catch (err) {
    onError({msg: err.message});
  }
  
}

init();
  
  /*
  findOne success
  //wait 2 seconds
  user: Carlos
  findOne error
  //wait 2 seconds
  ERROR: Element Not Found  
  */
  
  
  
    
    