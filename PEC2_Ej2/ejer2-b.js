/*creamos la función con el "new Promise"
* Ahora no debemos pasar las funciones "callback" en el constructor, ya que deberemos llamarlas
  con then/catch en la llamada a la nueva función promise*/
const findOne = (list, { key, value }) => new Promise( ( resolve, reject ) => {
  setTimeout(() => {
    //búsqueda en lista
    const element = list.find(element => element[key] === value);
    //si es correcto, confirmamos con resolve / sino con reject lanzamos "error" 
    //que sera tratado en el catch
    if(element) resolve(element);
    else reject({ msg: 'ERROR: Element Not Found' });
  }, 2000);
});

const onSuccess = ({ name }) => console.log(`user: ${name}`);
const onError = ({ msg }) => console.log(msg);

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

console.log('findOne success');
findOne(users, { key: 'name', value: 'Carlos' }).then( (user) => onSuccess(user)).catch((err) => onError(err));
console.log('findOne error');
findOne(users, { key: 'name', value: 'Fermin' }).then( (user) => onSuccess(user)).catch((err) => onError(err));

/*
findOne success
findOne error
 //wait 2 seconds
user: Carlos
ERROR: Element Not Found
*/



  
  