import MapManager from './MapManager.js';
import Users from './Users.js'
import Magasin from './Magasin.js'
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

            this.user.addToStorage();
            d.forEach(s => {
                let storePosition = { lat: s.geometry.location.lat(), lng: s.geometry.location.lng() }
                let distance = this.map.getDistance(this.user.position, storePosition)
                this.map.store.push(new Magasin(s, distance));
                this.map.addMarker(s, this.user.isFavorited(s.place_id) ? "pink" : "red")
            });

            this.map.store.sort(function compare(a, b) {
                if (a.distance < b.distance) return -1;
                if (a.distance > b.distance) return 1;
                return 0;
            });
        }).catch((err) => {
            console.error(err);
        })
        this.showMap()
    }
    set view(nbr) {// gerer l'affichage des vue
        if (nbr == 1) {
            document.querySelector("#tempmap").hidden = true
            document.querySelector("#magasinList").hidden = false
            document.querySelector(".magasinDetails").hidden = true
        } else if (nbr == 2) {
            document.querySelector("#tempmap").hidden = false
            document.querySelector("#magasinList").hidden = true
            document.querySelector(".magasinDetails").hidden = true
            document.querySelector("#cont").hidden = true
        } else if (nbr == 3) {
            document.querySelector("#tempmap").hidden = true
            document.querySelector("#magasinList").hidden = true
            document.querySelector(".magasinDetails").hidden = false
            document.querySelector("#cont").hidden = true
        }

    }
    async showMap() {//gere la vue map
        this.view = 2
        this.map.getPlace(this.map.point).then((d) => {

            this.user.addToStorage();
            d.forEach(store => {
                this.map.addMarker(store, this.user.isFavorited(store.place_id) ? "pink" : "red")
            });
        }).catch((err) => {
            console.error(err);
        })
        this.map.gmap.addEventListener('click', e => {
            this.showStore(this.map.click)
        }, { passive: true })
    }
    showList() {//gere la vue list de magasin
        this.view = 1
        console.log(this.map.store)
        let list = document.querySelector('.list-container');
        list.innerHTML = ""

        this.favoriteSort()
        this.map.store.forEach((elem) => {
            const itemList = document.querySelector("#card").content.cloneNode(true);
            itemList.querySelector(".card-container").addEventListener('click', (e) => {
                this.showStore(elem)

            })
            itemList.querySelector(".card-Titre").textContent = elem.name
            itemList.querySelector(".card-Distance").textContent = `${elem.distance} M`
            if (this.user.isFavorited(elem.place_id)) {
                itemList.querySelector(".card-Favoris svg").classList.remove("favoris-icon");
                itemList.querySelector(".card-Favoris svg").classList.add("favoris-icon-liked");
            }

            itemList.querySelector(".card-Note").textContent = elem.rating ? `${elem.rating}/5` : 'Pas de note'

            list.appendChild(itemList)
        })


    }

    /*  distanceSort(tab) {
         for (var i = 0; i < tab.length; i++) {
             //stocker l'index de l'élément minimum
             var min = i;
             for (var j = i + 1; j < tab.length; j++) {
                 if () {
                     // mettre à jour l'index de l'élément minimum
                     min = j;
                 }
             }
             var tmp = tab[i];
             tab[i] = tab[min];
             tab[min] = tmp;
         }
         return tab;
 
     } */
    favoriteSort(store) {
        this.user.favoris.forEach(elem => {
            this.map.store.forEach((s, i) => {
                if (s.place_id == elem) this.map.store.unshift(this.map.store.splice(i, 1)[0]);

            })
        })
    }

    isFavoriteIcon(store) {
        console.log(this.user.isFavorited(store.place_id))
        let icon = this.user.isFavorited(store.place_id) ? "favoris-icon-liked" : "favoris-icon"
        return icon
    }
    async showStore(store) {//gere le fonctionnement de la vue qui donne les commentaire des store 

        let details = await this.map.getStoreDetails(store)
        this.view = 3
        const comList = document.querySelector(".commentaires-container")
        comList.innerHTML = ""
        document.querySelector(".magasin-name").textContent = store.name
        document.querySelector(".magasin-note").textContent = store.rating ? `${store.rating}/5` : 'Pas de note'
        document.querySelector(".favoris svg").removeAttribute("class")
        document.querySelector(".favoris svg").classList = ""

        if (this.user.isFavorited(store.place_id)) {
            document.querySelector(".favoris svg").classList.remove("favoris-icon");
            document.querySelector(".favoris svg").classList.add("favoris-icon-liked");
        } else {
            document.querySelector(".favoris svg").classList.remove("favoris-icon-liked");
            document.querySelector(".favoris svg").classList.add("favoris-icon");
        }

        document.querySelector(".favoris").addEventListener('click', (e) => {

            if (this.user.isFavorited(store.place_id)) {
                e.target.classList.toggle("favoris-icon-liked");
                e.target.classList.toggle("favoris-icon");
                console.log('retirer des favoris')
                this.user.removeFavoris(store.place_id)
            }
            else {
                console.log('ajouter des favoris')
                e.target.classList.toggle("favoris-icon");
                e.target.classList.toggle("favoris-icon-liked");
                this.user.addFavoris(store.place_id)
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
    setPosition() { //donne la position de l'utilisateur
        if (navigator.geolocation) {
            this.user.getLocalisation().then((position) => {
                this.user.position.lat = position.coords.latitude;
                this.user.position.lng = position.coords.longitude;

            })
                .catch((err) => {
                    //alert()
                    alert("Geolocation is not enabled. Please enable to use this feature")
                    while (this.user.position.lat == 0 && this.user.position.lng == 0) {
                        this.setPosition()
                    }

                    console.error(err.message);
                });
        } else {

            alert('Geolocation is not supported by this device')
        }

    }
    selectView(elem) {
        elem.forEach(item => {
            item.addEventListener('click', e => {
                console.log(e.target.dataset.view)
                if (e.target.dataset.view == "Store") {
                    this.showList()
                } else if (e.target.dataset.view == "Map") {
                    this.showMap()
                }
            })
        })
    }
}