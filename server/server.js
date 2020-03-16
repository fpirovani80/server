const socketIO = require('socket.io');

const express = require('express')
const https = require('https');
const fs = require('fs');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express()

// archivo de configuraciones
require('./config');

// bodyParser
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// rutas
app.use(require('./rutas/login'));
app.use(require('./rutas/usuarios'));
app.use(require('./rutas/pozos'))

//handlebars
app.set('views', path.join(__dirname, 'views')); // indica donde esta la carpeta views, es necesario porque view no esta en el raiz del proyecto si no en la carpeta src
app.engine('.hbs', exphbs({ // .hbs es el nombre que le doy al motor de plantillas, exphbs lo defini arriba     
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'), // con join concateno views q lo defini arriba con layouts (\views\layouts)
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs', // defina la extension de los aarchivos handleabars
    helpers: require('./hbs/helpers')
}));
app.set('view engine', '.hbs'); // le digo que use el motor que defini arriba hbs

// carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

// mongoDB
require('./mongodb/mongodb');

// Mqtt
const { clienteMqtt } = require('./mqtt/mqtt_js');

// Configuracion del servidor https 
let pathKey = path.resolve(__dirname, './keys/key.pem')
let pathCert = path.resolve(__dirname, './keys/cert.pem')

let https_options = {
    key: fs.readFileSync(pathKey),
    cert: fs.readFileSync(pathCert),
    passphrase: 'PiroSoft'
};

let server = https.createServer(https_options, app).listen(process.env.PORT);;
console.log('Servidor en puerto ', process.env.PORT);



let io = socketIO(server);

io.on('connection', (cliente) => { // cliente contiene toda la informacion de la conexion entrante
    console.log('Se conecto in cliente Socket.IO ' + cliente.id);

    cliente.on('disconnect', () => {
        console.log('Cliente descoenctado');
    });

    // escuchar al cliente
    cliente.on('enviarMensaje', (mensaje) => {
        console.log(mensaje);
        clienteMqtt.publish('presence', 'mensaje')
    });

    clienteMqtt.on('message', (topic, message) => {
        if (topic === 'socket') {
            var mensajeString = message.toString();
            var decodedJson = decodeURIComponent(mensajeString);
            var estadoPozo = JSON.parse(decodedJson);

            cliente.emit('enviarMensaje', { estadoPozo });

        };
    });

});


module.exports = {
    io
};