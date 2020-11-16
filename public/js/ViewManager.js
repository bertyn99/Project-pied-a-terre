import MapManager from './MapManager.js'
import Users from './Users.js'
export default class ViewManager {
    constructor() {
        this.magasins = [];
        this._viewContainer = document.querySelector("#main");
        this.map = new MapManager()
        this.user = new Users()
    }

    set view(dom) {
        this._viewContainer.innerHTML = "";
        this._viewContainer.appendChild(dom);
    }


    showMap(elem) {
        let gmap = this.map.loadMap()
        this.user.getLocalisation().then((position) => {
            this.user.position = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            console.log(center);
        })
            .catch((err) => {
                console.error(err.message);
            });
        this.map.centerMap()
        this.view = gmap
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

console.log('veiw')