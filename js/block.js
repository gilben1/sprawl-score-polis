
let colorMap = {
    "Resident": 0xFF0000,
    "Park": 0x298F2E,
    "Commercial": 0x000DFF,
    "Industry": 0x555555,
    "Blank": 0xDDDDDD
}


class Block {
    color // orange, blue, green, grey
    roads // TBD
    visual
    pos = {
        x: 0,
        y: 0
    }

    graphics

    constructor (color, roads, x, y) {
        this.color = color;
        this.roads = roads;
        this.pos.x = x;
        this.pos.y = y;

        this.graphics = new Graphics();
        this.renderCard();
        this.graphics.interactive = true;
        this.graphics.on('pointerdown',(event) => {
            if (null !== director.activeButton) {
                this.setColor(director.activeButton.color);
            }
            director.mouseDown = true;
        })
        this.graphics.on('pointermove',(event) => {
            if (!director.mouseDown) return;
            if (null !== director.activeButton) {
                this.setColor(director.activeButton.color);
            }
        })
        this.graphics.on('pointerup',(event) => {
            director.mouseDown = false;
        })
    }

    setPos(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }

    setColor(color) {
        this.color = color;
        this.renderCard();
    }

    renderCard() {
        this.graphics.clear();
        this.graphics.beginFill(colorMap[this.color]);
        this.graphics.lineStyle(2, 0x000000);
        this.graphics.drawRect(this.pos.x * 43 + 10, this.pos.y * 28 + 10, 40, 25);
    }
}