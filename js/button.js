
class Button {
    color
    graphics

    pos = {
        x: 0,
        y: 0
    }

    constructor(color, x, y) {
        this.color = color;
        this.pos.x = x;
        this.pos.y = y;

        this.graphics = new Graphics();
        this.graphics.beginFill(colorMap[this.color]);
        // set the line style to have a width of 5 and set the color to red
        this.graphics.lineStyle(2, 0x000000);

        // draw a rectangle
        this.graphics.drawRect(x * 50 + 10, y * 28 + 10, 40, 25);
        this.graphics.interactive = true;
        this.graphics.on('pointerdown',(event) => {
            if (director.activeButton != null) {
                director.activeButton.graphics.alpha = 1.0;
            }
            if (director.activeButton == this) {
                director.activeButton = null;
            }
            else {
                director.activeButton = this;
                director.activeButton.graphics.alpha = 0.5;
            }
        })

    }
}