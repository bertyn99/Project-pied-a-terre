import Commentaire from "./Commentaire";
module.exports = class Magasin {
    constructor(nom, addresse) {
        this.nom = nom;
        this.addresse = addresse;
        this.commentaire = []
    }

    loadCommentaire() {

    }

    pinMagasin() {//pin du magasin sur la map

    }

    showMagasin() {

    }

    getDetails() {//recup les info du magasin par l'api google  et remplir les valeur de l'object
        this.nom
        this.addresse
        this.commentaire
    }

    getMagasinItem() {
        const item = document.querySelector("#card").content.cloneNode(true);
        item.querySelector(".card-footer-title").textContent = this.nom;
        item.querySelector(".card-footer-address").textContent = this.addresse;

    }

}