const { Console } = require('console');
const { UV_FS_O_FILEMAP } = require('constants');
const { resourceLimits } = require('worker_threads');
const { animals } = require('./data');
const data = require('./data');

function entryCalculator(entrants) {
  if(entrants == null || (Object.keys(entrants).length === 0 && entrants.constructor === Object)) return 0;
  
  return Object.keys(entrants).map( x => entrants[x] * data.prices[x]).reduce( (x, y) => x + y);
}

function schedule(dayName) {

  var hours = data.hours;

  if(!dayName || dayName === '') {    
    return Object.fromEntries(Object.keys(hours).map(x => GetScheludeFormatted(x,hours[x])));
  } 
  else {
    return Object.fromEntries([GetScheludeFormatted(dayName, hours[dayName])]);
  }
}

function GetScheludeFormatted(key, data)
{
  let open = data.open;
  let close = data.close;
  var text = '';

  if(open == 0 && close == 0) text = `CLOSED`;
  else 
  {
    var start = `${open <= 12 ? open + 'am' : (open % 12)+'pm'}`
    var end = `${close <= 12 ? close + 'am' : (close % 12)+'pm'}`
    text = `Open from ${start} until ${end}`;
  }

  return [`${key}`,text];
}

function animalCount(species) {
  if(!species)
  {
   return Object.fromEntries(data.animals.map( x=> [x.name, x.residents.length]));
  } else {
    var species = data.animals.filter( x=> x.name == species);
    if(species.length > 0) return species[0].residents.length;
  }

}

function animalMap(options) {
  var locations = data.animals.map((x) => x.location).filter( (value, index, self) => self.indexOf(value) === index );

  if(!options || (options && !('includeNames' in options)))
  { 
    return Object.fromEntries(locations.map(x=> [x, data.animals.filter( a => a.location == x).map( al => al.name)]));
  } else if (options && options.includeNames){
      var filterSex = 'sex' in options;

      return Object.fromEntries(locations.map(x=> [x, data.animals.filter( a => a.location == x).map( animals => {
        
        var r = filterSex ? animals.residents.filter(s => s.sex == options.sex).map( (r) => r.name) : 
                            animals.residents.map( (r) => r.name);
        var resultado = new Object();
        resultado[animals.name]= r;
        return resultado;
      })]));
  } 
}

function animalPopularity(rating) {
  var popularities = data.animals.map((x) => x.popularity).filter( (value, index, self) => self.indexOf(value) === index ).sort();
  

  if(!rating)
  {
    return popularities.map(x => [x,  data.animals.filter(a => a.popularity == x).map(fa => fa.name)]).reduce( (x, y) => { x[y[0]] = y[1]; return x;}, {});
  } else {
    return data.animals.filter(a => a.popularity == rating).map(fa => fa.name);
  }

  
}

function animalsByIds(ids) {
 
  if(!ids)
  {
    return [];
  } else {
    if(typeof ids == 'string'){
      return data.animals.filter(a => a.id == ids);
    } else if (typeof ids == 'object')
    {
      return data.animals.filter(a => ids.indexOf(a.id) >= 0 );
    }    
  }  
}

function animalByName(animalName) {
  
  if(!animalName) return {};
  
  var resultado = data.animals.filter( animals => {
      return animals.residents.filter( resident => resident.name == animalName ).length > 0
  }).flatMap(item => {
      var animal = item.residents.filter( resident => resident.name == animalName )
      animal[0].species = item.name;
      return animal[0];
  });
  return resultado[0];

}

function employeesByIds(ids) {
  if(!ids)
  {
    return [];
  } else {
    if(typeof ids == 'string'){
      return data.employees.filter(a => a.id == ids);
    } else if (typeof ids == 'object')
    {
      return data.employees.filter(a => ids.indexOf(a.id) >= 0 );
    }    
  }  
}

function employeeByName(employeeName) {
  if(!employeeName)
  {
    return {};
  } else if(typeof employeeName == 'string'){
    return data.employees.filter(a => a.firstName == employeeName || a.lastName == employeeName)[0];
  }  
}

function managersForEmployee(idOrName) {
  if(idOrName)
  {
    // 1 - Search employee
    let employee = data.employees.filter(a => a.firstName == idOrName || a.lastName == idOrName || a.id == idOrName)[0];
    if(employee)
    {
      //2 - take employees managers and parse it for replace in the result
      let managers = data.employees.filter(m => employee.managers.indexOf(m.id) >= 0);
      employee.managers = managers.map( m => `${m.firstName} ${m.lastName}`);
      return employee;
    } 
  }  

  return {};
}

function employeeCoverage(idOrName) {
  var employeesToShow = null;
  //1 - select the employees to show in the result by the value of parameter idOrName
  if(!idOrName)
  {
    employeesToShow = data.employees
   
  } else {
    employeesToShow = data.employees.filter(a => a.firstName == idOrName || a.lastName == idOrName || a.id == idOrName)
  }

  //2 - Get the result data
  var result = employeesToShow.map( x => {
    return [`${x.firstName} ${x.lastName}`, x.responsibleFor.map(x => data.animals.filter( a => a.id == x).map(fa => fa.name)[0])]
  });
  //3 - Reduce as object
  return result.reduce((x, y) => { x[y[0]] = y[1]; return x; }, {});
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalPopularity,
  animalsByIds,
  animalByName,
  employeesByIds,
  employeeByName,
  managersForEmployee,
  employeeCoverage
};
