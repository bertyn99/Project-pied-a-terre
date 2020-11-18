
export default class MapManager {
    constructor() {
        this.gmap = null;
        this.gApi = null;
        this.places = null
        this.bounds = null;
        this.store = [];
    }


    loadScript(src) {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script');
            script.src = src;

            script.onload = () => resolve(script);

            document.head.append(script);
        })
    }

    async loadMap(center) {
        const mapView = document.querySelector("#tempmap").content.cloneNode(true);
        this.gmap = mapView.querySelector('#map');

        this.loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyATn1epFBc_nwv_JmtbfS2HASUDX6Tt2TQ&libraries=places").then(() => {
            let infowindow = new google.maps.InfoWindow();
            console.log(center)
            let point = new google.maps.LatLng(center.lat, center.lng);
            this.gApi = new google.maps.Map(this.gmap, { zoom: 15, center: point });
            this.places = new google.maps.places.PlacesService(this.gApi);

            /*this.bounds = new google.maps.LatLngBounds this.place(point).then((d) => {


                this.store = d
                d.forEach(store => {
                    this.addMarker(store)
                    this.centerMap()
                });


            }).catch((err) => {
                console.error(err);
            }) */
            // The map, centered at Uluru

        })
        return this.gmap

    }

    addMarker(place) {
        let point = place.geometry.location
        const marker = new google.maps.Marker({
            map: this.gApi,
            position: point,
        });
        this.bounds.extend(point)
        google.maps.event.addListener(marker, "click", () => {
            infowindow.setContent(place.name);
            infowindow.open(this.gApi);
        });

    }

    showPlacesMarker(point) {
        this.getPlace(point).then((d) => {

            d.forEach(store => {
                this.addMarker(store)
                this.centerMap()
            });


        }).catch((err) => {
            console.error(err);
        })
    }

    async getPlace(position) {


        let request = {
            location: position,
            radius: '600',
            type: ['shoe_store']
        };

        return new Promise((resolve, reject) => {
            this.places.nearbySearch(request, (dat, err) => {
                if (dat) return resolve(dat)

                reject(err)
            });
        })
    }
    async getStore(point) {
        this.getPlace(point).then((d) => {


            this.store = d

            return this.store

        }).catch((err) => {
            console.error(err);
        })

    }
    centerMap() {
        this.gApi.panToBounds(this.bounds)
        this.gApi.fitBounds(this.bounds)
    }



}