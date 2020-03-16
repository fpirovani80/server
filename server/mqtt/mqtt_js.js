const mqtt = require('mqtt');

const mqtt_url = 'tcp://monitoreo.gualeguaychu.gov.ar';
var options = {
    port: 1883,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    username: 'planta',
    password: 'da123456',
};


const clienteMqtt = mqtt.connect(mqtt_url, options);
const topics = ['devices', 'socket'];

clienteMqtt.on('connect', () => {
    clienteMqtt.subscribe(topics, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Mqtt conectado y subsctiro a: ', topics);
        };
    });
})

clienteMqtt.on('message', (topic, message) => {

    let mensajeRecibido = message.toString();

    if (topic === 'devices') {
        let mensajeSplit = mensajeRecibido.split(",");

        let estadoPozo = {
            id: mensajeSplit[0],
            f1: mensajeSplit[1],
            f2: mensajeSplit[2],
            f3: mensajeSplit[3],
            estado: '1'
        }

        if (estadoPozo.f1 < 200 || estadoPozo.f1 > 225 ||
            estadoPozo.f2 < 200 || estadoPozo.f2 > 225 ||
            estadoPozo.f3 < 200 || estadoPozo.f3 > 225) {

            estadoPozo.estado = '3'
        }


        clienteMqtt.publish('socket', encodeURIComponent(JSON.stringify(estadoPozo)));
    };
});


module.exports = {
    clienteMqtt
}