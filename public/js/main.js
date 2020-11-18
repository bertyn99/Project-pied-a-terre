import ViewManager from './ViewManager.js'

let navbarItem = document.querySelectorAll('li');

let view = new ViewManager()
view.init()
view.selectView(navbarItem)
view.setPosition()






