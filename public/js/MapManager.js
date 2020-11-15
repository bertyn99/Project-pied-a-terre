module.exports = class MapManager {
    constructor() {
        this.magasins = [];
        this._viewContainer = document.querySelector("main");
    }

    set view(dom) {
        this._viewContainer.innerHTML = "";
        this._viewContainer.appendChild(dom);
    }

    load(element) {

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