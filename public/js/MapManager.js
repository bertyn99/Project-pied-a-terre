export default class MapManager {
    constructor() {
        this.gmap = null
        this.bounds = null
    }


    loadScript(src) {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script');
            script.src = src;

            script.onload = () => resolve(script);

            document.head.append(script);
        })
    }

    loadMap(center) {
        const mapView = document.querySelector("#tempmap").content.cloneNode(true);
        let divMap = mapView.querySelector('#map');

        this.loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyATn1epFBc_nwv_JmtbfS2HASUDX6Tt2TQ&libraries=places").then(() => {
            let infowindow = new google.maps.InfoWindow();
            console.log(center)
            let point = new google.maps.LatLng(center.lat, center.lng);
            // The map, centered at Uluru
            this.gmap = new google.maps.Map(divMap, { zoom: 15, center: point });
            this.bounds = new google.maps.LatLngBounds
        })
        return divMap

    }

    addMarker(place) {
        let point = place.geometry.location
        const marker = new google.maps.Marker({
            map,
            position: point,
        });
        this.bounds.extend(point)
        google.maps.event.addListener(marker, "click", () => {
            infowindow.setContent(place.name);
            infowindow.open(map);
        });
    }

    centerMap() {
        /*   this.gmap.panToBounds(this.bounds)
          this.gmap.fitBounds(this.bounds) */
    }



}