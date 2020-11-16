module.exports = class MapManager {
    constructor() {
        this.magasins = [];
        this._viewContainer = document.querySelector("main");
    }

    set view(dom) {
        this._viewContainer.innerHTML = "";
        this._viewContainer.appendChild(dom);
    }

    load() {
        let userCoord = { lat: -25.363, lng: 131.044 };
        let map = new google.maps.Map(document.querySelector('.carte'), {
            center: userCoord,
            zoom: 10
        });

    }

    showMap() {
        const mapView = document.querySelector("#tempmap").content.cloneNode(true);

        this.view = mapView;
    }

    getMagasinList() {//charge la liste de magasin

    }

    render(vue) {
        for (const store of this.magasins) {
            if (vue == store.name) {
                this.renderMagasinView(store);
            }
        }
    }

    renderMagasinView(store) {//affiche la vue details d'un magasin

    }

    renderMagasinListView() {
        const listView = document.querySelector("#card-list").content.cloneNode(true);
        for (let store of this.magasins) {
            listView.querySelector(".list-container").appendChild(store.getMagasinItem());
        }
    }
}