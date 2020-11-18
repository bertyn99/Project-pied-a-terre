import MapManager from './MapManager.js'
import Users from './Users.js'
export default class ViewManager {
    constructor() {
        this._viewContainer = document.querySelector("#main");
        this.map = new MapManager()
        this.user = new Users()
    }

    set view(dom) {
        this._viewContainer.innerHTML = "";
        this._viewContainer.appendChild(dom);
    }

    async init() {
        await this.map.loadMap(this.user.position)
        await console.log(this.map.getStore(this.user.position))
    }
    setPosition() {
        this.user.getLocalisation().then((position) => {
            this.user.position.lat = position.coords.latitude;
            this.user.position.lng = position.coords.longitude;
            console.log(position)
        })
            .catch((err) => {
                //alert()
                alert("Pour le fonctionnement du site activer votre géolocalistaion")
                console.error(err.message);
            });
    }
    showMap(elem) {

        let gmap = this.map.gmap;



        this.view = gmap
    }


    showList() {
        const listTemplate = document.querySelector("#card-list").content.cloneNode(true);
        const itemList = document.querySelector("#card").content.cloneNode(true);
        let list = listTemplate.querySelector('#magasinList');

        /*   .forEach(elem => {
              itemList.querySelector(".card-footer-title").innerHTML = elem.name
              itemList.querySelector(".card-footer-address").innerHTML = elem.address_components.long_name
              list.querySelector('.list-container').appendChild(itemList)
          }); */

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