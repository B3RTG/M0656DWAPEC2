# PEC 2
## Ejercicio 2
### a. Observad que se han creado funciones handle en el fichero controlador (todo.controller.js), las cuales son pasadas como parámetro. Esto es debido al problema con el cambio de contexto (this) que existe en JavaScript. Ahora mismo si no tienes muy claro que está sucediendo, revisa qué hacen las “fat-arrow” de ES6 sobre el objeto this, y prueba a cambiar el código para comprender qué está sucediendo cuando se modifica la siguiente línea:

    this.view.bindAddTodo(this.handleAddTodo);
    
Por esta:

`code`

    this.view.bindAddTodo(this.service.addTodo);

Responded, en un documento texto en el directorio de entrega a la siguiente pregunta: **¿Por qué es el valor de this es undefined?**

En javascript, se pierde muy rapidaemnte el contexto de `this`. Esto va a depender mucho del ambito en que se ejecuta la función. Es decir, si queremos utilizar la función en otra clase o metodo, deberemos utilizar el operador "fat arrow" para poder realizar la llamada a la función de otra clase ya que el operador "captura" el this y lo hace apuntar a donde debe.

