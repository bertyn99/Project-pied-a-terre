
export default class MapManager {
    constructor() {
        this.gmap = null;
        this.gApi = null;
        this.places = null
        this.bounds = null;
        this.store = [];
        this.infowindow = null
        this.point = null
        this.click = null
    }


    async loadScript(src) {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script');
            script.src = src;

            script.onload = () => resolve(script);

            document.head.append(script);
        })
    }

    async loadMap(center) {
        this.gmap = document.querySelector('#map');

        await this.loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyATn1epFBc_nwv_JmtbfS2HASUDX6Tt2TQ&libraries=places").then(() => {
            this.infowindow = new google.maps.InfoWindow();
            this.point = new google.maps.LatLng(center.lat, center.lng);
            this.gApi = new google.maps.Map(this.gmap, { zoom: 16, center: this.point });
            this.places = new google.maps.places.PlacesService(this.gApi);
            this.bounds = new google.maps.LatLngBounds




        });


    }

    async addMarker(place, color) {

        let point = place.geometry.location
        const marker = new google.maps.Marker({
            map: this.gApi,
            position: place.geometry.location,
            title: place.name,
            icon: {
                url: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`
            }
        });
        this.bounds.extend(point)

        google.maps.event.addListener(marker, "click", () => {
            this.infowindow.setContent(place.name);
            this.infowindow.open(this.gApi);
            this.click = place
        });

    }



    async getPlace(position) {


        let request = {
            location: position,
            radius: '500',
            type: ['shoe_store']
        };
        return await new Promise((resolve, reject) => {
            this.places.nearbySearch(request, (dat, err) => {
                if (dat) return resolve(dat)

                reject(err)
            });
        })
    }

    getDistance(pos1, pos2) {
        var R = 6371; // Radius of the earth in km 
        var dLat = (pos2.lat - pos1.lat) * (Math.PI / 180); // deg2rad below 
        var dLon = (pos2.lng - pos1.lng) * (Math.PI / 180);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(pos1.lat * (Math.PI / 180)) * Math.cos(pos2.lat * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km 
        return Math.ceil(d * 100) / 100;
    }



    async getStoreDetails(place) {


        return await new Promise((resolve, reject) => {
            this.places.getDetails({ placeId: place.place_id }, (dat, err) => {
                if (dat) return resolve(dat)

                reject(err)
            });
        })

    }
    async getStore() {
        this.store.forEach(sto => {
            console.log(sto)
            this.StoreDetails(sto).then(t => console.log(t)).catch((err) => {
                console.error(err);
            })

        })

    }
    centerMap() {
        this.gApi.panToBounds(this.bounds)
        this.gApi.fitBounds(this.bounds)
    }



}