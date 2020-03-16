// lleva el mapa a las coordenadas (15 es el zoom)
mymap.flyTo([-33.020736, -58.518211], 15);

// mostrar popup y aplicar estilo, className: '' para sacar el estilo
window[nombreVariable].bindPopup("<b>{{nombre}}</b><br>I am a popup.", {
    className: 'stylePopup'
});





window[nombreVariable].on('mouseover', function(e) {
    this.openPopup();
    //this.setIcon(redIcon);
});

window[nombreVariable].on('mouseout', function(e) {
    this.closePopup();
    //this.setIcon(greenIcon);
});

window[nombreVariable].on("click", function(e) { markerOnClick(e, '{{idMqtt}}'); }); // '{{idMqtt}}' parameto pasado a la funcion


let pozos = [{
        nombre: 'Toma de Agua',
        idMqtt: 'P001',
        coord: {
            lat: -32.980766,
            lng: -58.503896
        },
        estado: '1'
    },
    {
        nombre: 'Planta Potabilizadora de Agua',
        idMqtt: 'P002',
        coord: {
            lat: -32.997771,
            lng: -58.525506
        },
        estado: '2'
    },
    {
        nombre: 'Casvac',
        idMqtt: 'P003',
        coord: {
            lat: -33.011943,
            lng: -58.544089
        },
        estado: '3'
    },
    {
        nombre: 'Arturo Illia 140 viviendas',
        idMqtt: 'P004',
        coord: {
            lat: -33.013358,
            lng: -58.547486
        },
        estado: '1'
    },
    {
        nombre: 'Arrechea',
        idMqtt: 'P005',
        coord: {
            lat: -33.020736,
            lng: -58.518211
        },
        estado: '1'
    },
    {
        nombre: 'Francisco Ramirez-B 338 Viviendas',
        idMqtt: 'P006',
        coord: {
            lat: -33.013311,
            lng: -58.545858
        },
        estado: '3'
    }
];