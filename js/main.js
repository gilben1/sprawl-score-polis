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
    width: 1000, 
    height: 600,
    backgroundColor: 0xFFFFFF
});

window.onload = () => {
    console.log("Appending app.view to ")
    let boardDiv = document.getElementById("boardDiv");
    boardDiv.appendChild(app.view);
};

director = new Director(app, null);
console.log(director.board)
