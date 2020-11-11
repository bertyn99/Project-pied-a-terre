module.exports = class MagasinManager {
    constructor() {
        this.magasins = [];
        this._viewContainer = document.querySelector("main");
        history.replaceState({ view: this.getViewNameFromLocation() }, "", window.location.toString());
        window.addEventListener("popstate", (e) => {
            this.render(e.state.view);
        });
    }
}