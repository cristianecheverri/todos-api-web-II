//Crear servidor
const express = require('express')
const routerTodos = require('./routes')

const app = express()

app.use(express.json())

//Middleware a nivel de aplicación
app.use((req, res, next)=>{
    console.log(req)
    console.log(req.params)
    console.log(req.query)
    console.log(req.ip)
    console.log('Middleware de aplicación')
    console.log(req.method, req.url)
    next()
})

//Rutas
routerTodos(app)

//Levantando el servidor para escuchar por el puerto 3000
app.listen(3000, () => {
    console.log('Listening on port 3000');
})