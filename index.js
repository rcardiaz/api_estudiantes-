
/*API_ESTUDIANTES*/
//1ERO--Llamar el módulo de express, para nuestro proyecto.
const express = require('express')

/*_____________________________________________________________________*/
//2DO-- Creamos el objeto(global) principal de todo nuestro código, porque es el objeto que va contener
// la información o código de express, es decir del frenwork, es decir
// con este objeto podremos crear:rutas, funciones, si necesitamos alguna configuración dentro de la API.
// será el centro de la aplicación
//NUESTRO OBJETO CENTRAL SE LLAMA app
//creamos el objeto y le decimos que utilizará express
const  app =express()

/*_____________________________________________________________________*/
// 7TO--Indicamos que nuestra API tiene un middleware(forma de comunicar o procesar algo)
//Le estamos diciendo la forma en que se trabajara:
// quiero procesar las respuestas en formato json.
app.use(express.json())


/*_____________________________________________________________________*/
//4TO--Para nuestra API, necesitamos una lista de estudiantes y como no vamos a 
// utilizar BD, utilizaremos eun arreglo de objetos y cada objetos tiene propiedades.
// Simulando la BD de estudiantes
const estudiantes = [
    { id: 1, nombre: "Ana García", edad: 18, correo: "ana.garcia@email.com" },
    { id: 2, nombre: "Carlos López", edad: 17, correo: "carlos.lopez@email.com" },
    { id: 3, nombre: "María Pérez", edad: 18, correo: "maria.p@email.com" }
]

//necesito un servidor, y un puerto, por defecto el puerto de express es el 3000
//servidor=localhost

/*_____________________________________________________________________*/
// 3ERO--Metodo para poder configurar el puerto, donde se iba manejar express
// de la app, llamo el metodo LISTEN y este metodo pide el puerto, por defecto es el puerto 3000
// lo que va despues es una función 
//para ejecutar el puerto, agregamos una terminal,
// revisar que solo tengamos una terminal
//en la terminal digitar: node index.js
app.listen(3000,() =>{
    console.log("Hola, este es el servidor de express http://localhost:3000/")
    
})
//comando para ejecutar el servidor-- node index.js

/*_____________________________________________________________________*/
//5TO--Crear enrrutamiento(UNA DIRECCION, QUE ESA RUTA DEBE HACER ALGO) de la API
//Creando la ruta principal(peticion GET, POST, PUT, PATCH, DELETE)

 // Mi primer endpoint (PRIMERA RUTA-SERA LA RUTA PRINCIPAL)
 //Utilizamos un GET, porque lo único que hace es devolver un mensaje
 /**
  * primero pide la URI(RUTA)=='/' como es la principal le ponemos la pleca.
  * (req, res) =>{  == es una funcion flecha, utiliza dos parametros:
  *(primer parametro)  req= request---representa una PETICIÓN(recibe datos, recibe información, cuerpo de datos, parámetros), 
  *se utiliza cuando necesitamos datos del usuario(body), headers, parameters)
    ej: crear un producto, para crear el producto, es necesario que el usuario envie, el nombre del producto, precio, etc.
     ej: categoria de electrodomesticos, se le pide al usuario que mande un parametro, 
  * (segundo parametro) res= RESPESTA(si la lógica es agregar una proveedor ), indica response(lo que se devuelve al cliente)
    ej: despues de crear el producto, se le envia, PRODUCTO REGISTRADO EXITOSAMENTE.
       SI SALIO OK, O UNA RESPUESTA DE ERROR.
 */
  //El navegador solo muestran peticiones tipo GET
app.get('/', (req, res) =>{
    //codigo de la funcion
    //logica de lo que se hara dentro de la funcion
    //Se mandara respuesta
    res.send("Hola Mundo, Buenvenidos a mi API Estudiantes.")
    
})

/*_____________________________________________________________________*/
//6TO--ruta para obtener todos los estudiantes(SEGUNDO endpoint)
//GET porque vas a obtener datos
app.get('/estudiantes', (req, res) =>{
    //codigo de la funcion
    // res.send(estudiantes)
    //la respuesta debe ser de tipo json
    res.status(200).json(estudiantes)
    
});

   
/*_____________________________________________________________________*/
//8to ruta para obtener un estudiante por ID (la ruta lleva parámetro)
//el argumento es lo que la persona envia.
//Es un GET porque se esta obteniendo datos
// --  /:estudianteid -- indica que será un valor dinámico(valor que ingresa el usuario)
app.get('/estudiantes/:estudianteId', (req, res) =>{
    //codigo de la funcion...
    //para hacer una búsqueda find()=> busca un elemento específico en un arreglo
    //devuelve el estudiante que se pide con el método find,item--seria cada estudiante, 
    //item.id-- de todo el item, solo se necesita el id
    const id = Number(req.params.estudianteId);  //captura el valor, validar que lo que ingrese sea dato numérico
    const encontrar_estudiante=estudiantes.find(estudiante => estudiante.id === id);
    
    //Validar que si el estudiante NO existe
    if(!encontrar_estudiante){
        return res.status(404).json({error:'Estudiante no encontrado' }) //estudiante no encontrado
    }
    //si se ha encontrado
    res.status(200).json(encontrar_estudiante)
});

/*_____________________________________________________________________*/
//9o-- CREAR UN NUEVO ESTUDIANTE  --POST--
app.post('/estudiantes', (req, res) =>{
    //haciendo el cuerpo de datos para registrar estudiantes, aqui no se requieren parámetros
    //se solicita  a la persona que envie datos
    //el cuerpo sera un objeto, que tendra propiedades
    const {nombre, edad, correo} = req.body //puede darles otro nombre al campo, se recomienda poner el mismo nombre
    //no se incluye el ID porque este será automatico, se obtendran del body, de los datos ingresados por el usuario.
    
    //Agregamo los datos ingresados al arreglo
    const nuevoEstudiante = {
        id: estudiantes.length + 1,
        //como se llaman igual, puede escribirse, porque le hemos llamado con el mismo nombre del arreglo
        //nombre:nombre
        nombre,
        edad,
        correo
    }
    //Agregamos el nuevo objeto arreglo
   estudiantes.push(nuevoEstudiante);
   
   res.status(201).json({
        message: "Registrado exitosamente",
        estudiante: nuevoEstudiante
    })  //201 es para crear un nuevo recurso
});

/*_____________________________________________________________________*/
//10--Ruta para actualizar el correo de un estudiante, utilizando PATCH
app.patch('/estudiantes/:estudianteId', (req, res) =>{
    //codigo de la funcion...
    //PRIMEERO-- encontramos al estudiante a actualizar, 
    const id = Number(req.params.estudianteId);  //captura el valor, validar que lo que ingrese sea dato numérico
    const encontrar_estudiante=estudiantes.find(estudiante => estudiante.id === id);
    
    //Validar que si el estudiante NO existe
    if(!encontrar_estudiante){
        return res.status(404).json({error:'Estudiante no encontrado' }) //estudiante no encontrado
    }
    //SEGUNDO--Si el estudiante existe, actualizar el correo
    //para ellos necesitamos un body,  el usuario debe mandar el nuevo correo
    const {nuevo_correo} = req.body
    //actualizar el correo del estudiante que encontre
     encontrar_estudiante.correo = nuevo_correo
    res.status(200).json({
        message: "Correo actualizado exitosamente",
        estudiante: encontrar_estudiante
        })  
});


/*_____________________________________________________________________*/
//11--Actualizar toda la informción de un estudiante
app.put('/estudiantes/:estudianteId', (req, res) =>{
    //codigo de la funcion...
    //1-- encontramos al estudiante a actualizar, 
    const id = Number(req.params.estudianteId);  //captura el valor, validar que lo que ingrese sea dato numérico
   if (isNaN(id)) {
        return res.status(400).json({ 
            mensaje: "El ID proporcionado debe ser un número válido." 
        });
    }
   
    const encontrar_estudiante=estudiantes.find(estudiante => estudiante.id === id);
    
    // 2. Validar si el estudiante no existe
    if (!encontrar_estudiante) {
        return res.status(404).json({ 
            mensaje: `No se encontró ningún estudiante con el ID ${id}` 
        });
    } 
        // 3. Extraer los nuevos datos del body
    const { nombre, edad, correo } = req.body; // Cambia estos campos según tu modelo
   
    // 4. Actualizar los campos del estudiante encontrado
    // Usamos el operador OR (||) para mantener el valor original si el campo no viene en el body
    encontrar_estudiante.nombre = nombre ?? encontrar_estudiante.nombre;
    encontrar_estudiante.edad = edad ?? encontrar_estudiante.edad;
    encontrar_estudiante.correo = correo ?? encontrar_estudiante.correo;

    // 5. Responder al cliente con el objeto ya actualizado
    res.status(200).json({
        mensaje: "Estudiante actualizado con éxito",
        estudiante: encontrar_estudiante
    });
});


/*_____________________________________________________________________*/
//12--Elimina un estudiante
app.delete('/estudiantes/:estudianteId', (req, res) =>{
    //codigo de la funcion...
    //1-- encontramos al estudiante a actualizar, 
    const id = Number(req.params.estudianteId);  //captura el valor, validar que lo que ingrese sea dato numérico
   if (isNaN(id)) {
        return res.status(400).json({ 
            mensaje: "El ID proporcionado debe ser un número válido." 
        });
    }
   
    // Buscamos la POSICIÓN en el arreglo
    const indice_estudiante = estudiantes.findIndex(estudiante => estudiante.id === id);
    
    // 2. Si .findIndex() devuelve -1, significa que NO lo encontró
    if (indice_estudiante === -1) {
        return res.status(404).json({ 
            mensaje: `No se encontró ningún estudiante con el ID ${id}` 
        });
    }

    // Guardamos una copia del estudiante antes de borrarlo por si queremos mostrarlo en la respuesta
    const estudiante_eliminado = estudiantes[indice_estudiante];

    // 3. Eliminar al estudiante del arreglo usando .splice(posición, cuántos_elementos)
    estudiantes.splice(indice_estudiante, 1);

    // 4. Responder al cliente que el proceso fue exitoso
    res.status(200).json({
        mensaje: "Estudiante eliminado con éxito",
        estudiante: estudiante_eliminado
    });
      
});