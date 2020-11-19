export default class Magasin {
    constructor(place, distance) {
        this.name = place.name;
        this.place_id = place.place_id
        this.rating = place.rating;
        this.localisation = place.geometry;
        this.distance = distance
    }



}