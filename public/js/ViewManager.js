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
            document.querySelector(".magasinDetails").hidden = true
        } else if (nbr == 2) {
            document.querySelector("#tempmap").hidden = false
            document.querySelector("#magasinList").hidden = true
            document.querySelector(".magasinDetails").hidden = true
        } else if (nbr == 3) {
            document.querySelector("#tempmap").hidden = true
            document.querySelector("#magasinList").hidden = true
            document.querySelector(".magasinDetails").hidden = false
        }

    }
    showMap() {
        this.view = 2

    }
    showList() {
        this.view = 1
        console.log(this.map.store);
        let list = document.querySelector('.list-container');
        list.innerHTML = ""

        this.map.store.forEach((elem) => {
            const itemList = document.querySelector("#card").content.cloneNode(true);
            itemList.querySelector(".card-container").addEventListener('click', (e) => {
                this.showStore(elem)

            })
            itemList.querySelector(".card-Titre").textContent = elem.name
            itemList.querySelector(".card-Distance").textContent = 'non'
            itemList.querySelector(".card-Favoris").textContent = 'non'
            itemList.querySelector(".card-Note").textContent = `${elem.rating}/5`

            list.appendChild(itemList)
        })


    }

    async showStore(store) {
        this.view = 3
        let details = await this.map.getStoreDetails(store)
        const comList = document.querySelector(".commentaires-container")
        comList.innerHTML = ""
        console.log(details.reviews)
        document.querySelector(".magasin-name").textContent = store.name
        document.querySelector(".magasin-note").textContent = `${store.name}`
        details.reviews.forEach(elm => {
            const comItem = document.querySelector("#com").content.cloneNode(true)
            comItem.querySelector(".com-img").src = elm.profile_photo_url;
            comItem.querySelector(".com-body").textContent = elm.text
            comItem.querySelector(".com-date").textContent = elm.relative_time_description
            comList.appendChild(comItem)
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