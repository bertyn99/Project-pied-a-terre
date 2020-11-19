export default class Users {
    constructor() {
        this.position = { lat: 0, lng: 0 };
        this.favoris = []//stock l'id des magasin qu'il aime
    }

    addFavoris(magasin) {//ajout un magasin au favoris
        this.favoris.push(magasin)
        localStorage.favoris = JSON.stringify(this.favoris)
    }
    removeFavoris(magasin) {
        this.favoris.filter(item => item !== magasin)
        localStorage.favoris = JSON.stringify(this.favoris)
    }
    addToStorage() {//ajout au local storage
        this.getStorage();
        if (this.favoris.length == 0) {
            localStorage.setItem('favoris', JSON.stringify(this.favoris));
        }
    }
    getLocalisation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 5000
            });
        });
    }
    isFavorited(store) {
        return this.favoris.includes(store)
    }
    watchLocalisation() {// utilisateur se deplace
        return new Promise((resolve, reject) => {
            navigator.geolocation.watchPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 5000
            });
        });
    }

    nearbySearch() {

    }
    getStorage() {
        let favorisString = localStorage.getItem("favoris");
        console.log(favorisString)
        if (favorisString != null) this.favoris = JSON.parse(favorisString);


    }
}