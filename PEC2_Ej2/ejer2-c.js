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


  const findOneAsync = async function(list, { key, value }) {
          //búsqueda en lista
      const element = list.find(element => element[key] === value);
      //si es correcto, confirmamos con resolve / sino con reject lanzamos "error" 
      //que sera tratado en el catch
      if(element) return element;
      else 
      {
        const err =  new Error('ERROR: Element Not Found' );
        throw err;
      }
  }

  const findOne = async (list, { key, value }) => {
    //setTimeout(async () => {
      try {
        const result = await findOneAsync(list, {key, value});  
        onSuccess(result);
      } catch (err) {
        console.log(err.message);
      }
    //}, 2000);      
  }
  
  console.log('findOne success');
  findOne(users, { key: 'name', value: 'Carlos' });
  console.log('findOne error');
  findOne(users, { key: 'name', value: 'Fermin' });
  
  /*
  findOne success
  findOne error
   //wait 2 seconds
  user: Carlos
  ERROR: Element Not Found
  */
  
  
  
    
    