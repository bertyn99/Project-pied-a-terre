module.exports = class Users {
    constructor(position) {
        this.position = position;
        this.favoris = []//stock l'id des magasin qu'il aime
    }

    addFavoris(magasin) {//ajout un magasin au favoris
        this.favoris.push(magasin)
    }

    addToStorage() {//ajout au local storage
        localStorage.setItem('favoris', JSON.stringify(this.favoris));
    }
    getLocalisation() {

    }
    nearbySearch() {

    }
    getStorage() {
        let favorisString = localStorage.getItem("favoris");
        this.favoris = JSON.parse(favorisString);
    }
}