let map;
let marker;

//Geolocalizacion
let watchID;
let geoLoc;




function initMap() {
    const myLatLng = { lat: -33.5857431, lng: -70.5836762 };
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 15,
        center: myLatLng,
    });
    marker = new google.maps.Marker({
        position: myLatLng,
        map,
        title: "Hola mundo"
    });
    getPosition();
};

function getposition() {
    if (navigator.geolocation) {
        let options = { timeout: 60000 };
        watchID = geoLoc.watchPosition(showLocationOnMap, errorHandler, options);
    } else {
        aler('lo sentimos, el explorador no soporta geolocalizacion');
    }
};

function showLocationOnMap(position) {
    let latitud = position.coords.latitude;
    let longitud = position.coords.longitude;
    console.log('latitud: ' + latitud + 'Longitud: ' + longitud);

    const myLatLng = { lat: latitud, lng: longitud };
    marker.setPosition(myLatLng);
    map.setCenter(myLatLng);
};

function errorHandler(err){
    if(err.code == 1) {
        alert("Error: Acceso denegado");
    } else if ( err.code == 2) {
        alert('Error: Position no existe o no se encuentra');
    };
};

window.initMap = initMap;



