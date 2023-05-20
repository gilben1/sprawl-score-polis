// PIXI Aliases
let Application = PIXI.Application,
    //loader = PIXI.loader,
    //resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle,
    TextureCache = PIXI.utils.TextureCache,
    Text = PIXI.Text,
    Container = PIXI.Container,
    Graphics = PIXI.Graphics;

let director; // director object;

let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
}
PIXI.utils.sayHello(type)

let app = new Application({
    width: 700, 
    height: 525,
    backgroundColor: 0xFFFFFF
});

window.onload = () => {
    let boardDiv = document.getElementById("boardDiv");
    boardDiv.appendChild(app.view);
};

director = new Director(app, null);
director.initAdjacentBlocks();





function selectText(textField) 
{
    textField.focus();
    textField.select();
}

function exportLayout() {
    let exportField = document.getElementById("exportOutput");
    exportField.value = director.exportBoard();
}

function importLayout() {
    let importField = document.getElementById("importInput");
    if (importField.value) {
        director.importBoard(importField.value);
    }
}