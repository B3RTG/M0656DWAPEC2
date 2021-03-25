/*
* creamos la función con el await para poder ser usada con el async.
* SetTimeout lo creamos como una promise para hacer el efecto de eseperar 2 segundos
*/
const findOne = async function(list, { key, value }) {
  await new Promise( (resolve) => setTimeout(() => resolve(), 2000));
    //búsqueda en lista
  const element = list.find(element => element[key] === value);
  //si es correcto, confirmamos con resolve / sino con reject lanzamos "error" 
  //que sera tratado en el catch
  if(element) return element;
  else 
  {
    throw new Error('ERROR: Element Not Found' );         
  }
}

const onSuccess = ({ name }) => console.log(`user: ${name}`);
const onError = ({ msg }) => {
  console.log(msg);
}

  
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

 // las llamadas las realizamos con promises "then/catch" para que sea secuencial.
 // las funciones "async" se pueden usar con promesas ya que viene a ser lo mismo que un "new promise"
  console.log('findOne success');
  findOne(users, { key: 'name', value: 'Carlos' }).then((usr => onSuccess(usr))).catch(err => onError({ msg: err.message }));
  console.log('findOne error');
  findOne(users, { key: 'name', value: 'Fermin' }).then((usr => onSuccess(usr))).catch(err => onError({ msg: err.message }) );
  