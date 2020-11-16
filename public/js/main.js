import Users from './Users'

let divMap = document.querySelector('#map');


class Mapmanager {


    load(elem) {
        $script("https://maps.googleapis.com/maps/api/js?key=AIzaSyATn1epFBc_nwv_JmtbfS2HASUDX6Tt2TQ&libraries=places", (params) => {
            let sydney = new google.maps.LatLng(-33.867, 151.195);
            // The map, centered at Uluru
            let map = new google.maps.Map(elem, { zoom: 15, center: sydney });

        })
    }
    addMarker

}

if (divMap != null) {
    let map = new Mapmanager()
    map.load(divMap)

}


/* function initMap() {

    // The location of Uluru
    let sydney = new google.maps.LatLng(-33.867, 151.195);
    // The map, centered at Uluru
    let map = new google.maps.Map(document.querySelector('#map'), { zoom: 15, center: sydney });
    // The marker, positioned at Uluru
    var request = {
        query: 'Museum of Contemporary Art Australia',
        fields: ['name', 'geometry'],
    };

    var service = new google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(request, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
            map.setCenter(results[0].geometry.location);
        }
    });
} */
let scriptmap = document.querySelector('script')
scriptmap.onload()
