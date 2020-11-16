
class ViewManager {
    constructor() {
        this.magasins = [];
        this._viewContainer = document.querySelector("#main");
    }

    set view(dom) {
        this._viewContainer.innerHTML = "";
        this._viewContainer.appendChild(dom);
    }

    loadScriptMap(src) {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script');
            script.src = src;

            script.onload = () => resolve(script);

            document.head.append(script);
        })

    }
    showMap(elem) {
        const mapView = document.querySelector("#tempmap").content.cloneNode(true);
        let divMap = mapView.querySelector('#map');

        this.loadScriptMap("https://maps.googleapis.com/maps/api/js?key=AIzaSyATn1epFBc_nwv_JmtbfS2HASUDX6Tt2TQ&libraries=places").then(() => {
            let sydney = new google.maps.LatLng(-33.867, 151.195);
            // The map, centered at Uluru
            let map = new google.maps.Map(divMap, { zoom: 15, center: sydney });

        })
        this.view = divMap

    }
    showList() {
        const listTemplate = document.querySelector("#card-list").content.cloneNode(true);
        const itemList = document.querySelector("#card").content.cloneNode(true);
        let list = listTemplate.querySelector('#magasinList');
        console.log(list.querySelector('.list-container'))
        list.querySelector('.list-container').appendChild(itemList)
        this.view = list
    }

    showFavorite() {

    }

    selectView(elem) {
        elem.forEach(item => {
            item.addEventListener('click', e => {
                console.log(e.target.dataset.view)
                if (e.target.dataset.view == "Accueil") {
                    this.showList()
                } else if (e.target.dataset.view == "Map") {
                    this.showMap()
                } else if (e.target.dataset.view == "Favoris") {
                    this.showFavorite()
                }
            })
        })
    }
}
