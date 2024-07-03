//Crear servidor
require('dotenv').config()
const express = require('express')
const routerTodos = require('./routes')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const passportConfig = require('./config/passport');

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
// Middleware para parsear los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

//Middleware para manejar cookies y sesiones
app.use(cookieParser());
app.use(session({
    secret: 'KMDsina09ujdDCJkajsd',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // true si usas HTTPS
        maxAge: 1000 * 60 * 60 * 24 // 1 día
    }
}));

//Middleware a nivel de aplicación
app.use((req, res, next) => {
    next()
})

app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use(expressLayouts);
app.set('layout', 'layouts/base');

//Configuración de passport
passportConfig(app);

//Rutas
routerTodos(app)

//Levantando el servidor para escuchar por el puerto 3000
app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT);
})