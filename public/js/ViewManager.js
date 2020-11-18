import MapManager from './MapManager.js';
import Users from './Users.js'
export default class ViewManager {
    constructor() {
        this.map = new MapManager();
        this.user = new Users()
        this.store = [];
    }

    async init() {
        await this.map.loadMap(this.user.position)
        this.showMap()
    }
    set view(nbr) {
        if (nbr == 1) {
            document.querySelector("#tempmap").hidden = true
            document.querySelector("#magasinList").hidden = false
        } else if (nbr == 2) {
            document.querySelector("#tempmap").hidden = false
            document.querySelector("#magasinList").hidden = true
        }

    }
    showMap() {
        this.view = 2

    }
    showList() {
        this.view = 1
        console.log(this.map.store);
        let list = document.querySelector('.list-container');


        this.map.store.forEach((elem) => {
            const itemList = document.querySelector("#card").content.cloneNode(true);
            itemList.querySelector(".card-Titre").textContent = elem.name
            itemList.querySelector(".card-Distance").textContent = 'non'
            itemList.querySelector(".card-Favoris").textContent = 'non'
            itemList.querySelector(".card-Note").textContent = `1/5`
            list.appendChild(itemList)
        })





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
    selectView(elem) {
        elem.forEach(item => {
            item.addEventListener('click', e => {
                console.log(e.target.dataset.view)
                if (e.target.dataset.view == "Accueil") {
                    this.showList()
                } else if (e.target.dataset.view == "Map") {
                    this.showMap()
                }
            })
        })
    }
}