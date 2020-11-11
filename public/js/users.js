class Users {
    constructor(name, position) {
        this.name = name;
        this.position = position;
        this.favoris = []//stock l'id des magasin qu'il aime
    }

    addFavoris(magasin) {//ajout un magasin au favoris
        this.favoris.push(magasin)
    }

    addToStorage() {//ajout au local storage

    }
    getLocalisation() {

    }
    nearbySearch() {

    }
}