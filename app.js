// Importaciones: traemos express (framework web) y path (para rutas de archivos)
const express = require('express')
const path = require('path')

// Creacion de la app y conexion con las rutas
const app = express()
const routes = require('./src/routes/routes')

// Configuracion de vistas: usamos EJS como motor de plantillas
// set es como un diccionario de clave valor 
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src/views'))
// __dirname


// Middlewares: procesan cada peticion antes de llegar a las rutas
// Un middleware es una función que se ejecuta entre la petición del usuario y tu ruta
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'src/public')))

// Conectamos las rutas del router a la raiz del servidor
app.use('/', routes)

// Iniciamos el servidor en el puerto 3000
app.listen(3000, () => {
  // forma mas corta de escribir funciones 
  console.log('Servidor corriendo en http://localhost:3000')
})
