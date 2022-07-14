// All of the Node.js APIs are available in the preload process.

import path from "path";

// It has the same sandbox as a Chrome extension.
const { Titlebar, Color } = require('custom-electron-titlebar');

let titlebar;

window.addEventListener('DOMContentLoaded', () => {
  titlebar = new Titlebar({
    backgroundColor: Color.fromHex("#333333"),
    itemBackgroundColor: Color.fromHex("#094771"),
    svgColor: Color.WHITE,
    icon: path.join(__dirname, 'icon.svg')
    //menu: null // = do not automatically use Menu.applicationMenu
  });
})