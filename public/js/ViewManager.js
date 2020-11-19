import MapManager from './MapManager.js';
import Users from './Users.js'
export default class ViewManager {
    constructor() {
        this.map = new MapManager();
        this.user = new Users()

    }

    async init() {
        let navbarItem = document.querySelectorAll('li')
        this.selectView(navbarItem)
        this.setPosition()
        await this.map.loadMap(this.user.position)
        this.map.getPlace(this.map.point).then((d) => {
            this.map.store = d;
            this.user.addToStorage();
            d.forEach(store => {
                this.map.addMarker(store, this.user.isFavorited(store.place_id) ? "pink" : "red")
            });
        }).catch((err) => {
            console.error(err);
        })

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
        this.map.gmap.addEventListener('click', e => {
            this.showStore(this.map.click)
        }, { passive: true })
    }
    showList() {
        this.view = 1
        console.log(this.map.store);

        this.favoriteSort()
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
            if (this.user.isFavorited(elem.place_id)) {
                itemList.querySelector(".card-Favoris svg").classList.remove("favoris-icon");
                itemList.querySelector(".card-Favoris svg").classList.add("favoris-icon-liked");
            }

            itemList.querySelector(".card-Note").textContent = elem.rating ? `${elem.rating}/5` : 'Pas de note'

            list.appendChild(itemList)
        })


    }
    favoriteSort(store) {
        this.user.favoris.forEach(elem => {
            this.map.store.forEach((s, i) => {
                if (s.place_id == elem) this.map.store.unshift(this.map.store.splice(i, 1)[0]);

            })


        })
    }
    async showStore(store) {
        this.view = 3
        let details = await this.map.getStoreDetails(store)
        const comList = document.querySelector(".commentaires-container")
        comList.innerHTML = ""
        document.querySelector(".magasin-name").textContent = store.name
        document.querySelector(".magasin-note").textContent = store.rrating ? `${store.rating}/5` : 'Pas de note'
        document.querySelector(".favoris-icon").addEventListener('click', (e) => {
            console.log(e.target);

            if (e.target.classList.contains("favoris-icon")) {
                e.target.classList.remove("favoris-icon")
                e.target.classList.add("favoris-icon-liked")
                this.user.addFavoris(store.place_id)
            }
            else {
                e.target.classList.remove("favoris-icon-liked")
                e.target.classList.add("favoris-icon")
                this.user.removeFavoris(store.place_id)
            }


        })
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