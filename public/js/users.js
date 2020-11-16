export default class Users {
    constructor() {
        this.position = null;
        this.favoris = []//stock l'id des magasin qu'il aime
    }

    addFavoris(magasin) {//ajout un magasin au favoris
        this.favoris.push(magasin)
    }

    addToStorage() {//ajout au local storage
        localStorage.setItem('favoris', JSON.stringify(this.favoris));
    }
    getLocalisation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }


    nearbySearch() {

    }
    getStorage() {
        let favorisString = localStorage.getItem("favoris");
        this.favoris = JSON.parse(favorisString);
    }
}