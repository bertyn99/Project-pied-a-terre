export default class MapManager {
    constructor() {
    }


    loadScriptMap(src) {
        return new Promise((resolve, reject) => {
            let script = document.createElement('script');
            script.src = src;

            script.onload = () => resolve(script);

            document.head.append(script);
        })

    }





}