
export default class MapManager {
    constructor() {
        this.gmap = null;
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

    loadMap(center) {
        const mapView = document.querySelector("#tempmap").content.cloneNode(true);
        let divMap = mapView.querySelector('#map');

        this.loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyATn1epFBc_nwv_JmtbfS2HASUDX6Tt2TQ&libraries=places").then(() => {
            let infowindow = new google.maps.InfoWindow();
            console.log(center)
            let point = new google.maps.LatLng(center.lat, center.lng);
            this.gmap = new google.maps.Map(divMap, { zoom: 14, center: point });
            this.bounds = new google.maps.LatLngBounds
            this.place(point).then((d) => {


                d.forEach(store => {
                    this.addMarker(store)
                });


            })
            // The map, centered at Uluru

        })
        return divMap

    }

    addMarker(place) {
        let point = place.geometry.location
        const marker = new google.maps.Marker({
            map: this.gmap,
            position: point,
        });
        this.bounds.extend(point)
        google.maps.event.addListener(marker, "click", () => {
            infowindow.setContent(place.name);
            infowindow.open(this.gmap);
        });
        this.centerMap()
    }

    async place(position) {


        let request = {
            location: position,
            radius: '600',
            type: ['shoe_store']
        };

        let service = new google.maps.places.PlacesService(map);
        return new Promise((resolve, reject) => {
            service.nearbySearch(request, (dat, err) => {
                if (dat) return resolve(dat)

                reject(err)
            });
        })
    }
    getStore(position) {
        this.place(position).then((d) => {
            d.forEach(elm => {
                this.store.push(elm)
            })

        }).catch((err) => {
            console.error(err);
        })
    }
    centerMap() {
        /*  this.gmap.panToBounds(this.bounds) */
        this.gmap.fitBounds(this.bounds)
    }



}