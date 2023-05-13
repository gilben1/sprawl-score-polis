
class Block {
    color // orange, blue, green, grey
    roads = {
        "N": false,
        "S": false,
        "E": false,
        "W": false,
    }
    visual
    pos = {
        x: 0,
        y: 0
    }

    graphics

    constructor (color, x, y) {
        this.color = color;
        this.pos.x = x * 43 + 10;
        this.pos.y = y * 29 + 10;

        this.graphics = new Graphics();
        this.renderCard();
        this.graphics.interactive = true;

        this.graphics.on('pointerdown',(event) => {
            if (null !== director.activeButton) {
                this.setColor(director.getSelectedColor());
                director.updateScores();
            }
            director.mouseDown = true;
            director.updateActiveBlock(this);
        })
        this.graphics.on('pointermove',(event) => {
            if (!director.mouseDown) return;
            if (null !== director.activeButton) {
                this.setColor(director.getSelectedColor());
                director.updateScores();
            }
            director.updateActiveBlock(this);
        })
        this.graphics.on('pointerup',(event) => {
            director.mouseDown = false;
        })
        this.graphics.on('pointerupoutside',(event) => {
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
        this.graphics.drawRect(this.pos.x, this.pos.y, 40, 26);
        if (this.roads["N"]) {
            this.graphics.moveTo(this.pos.x + 20, this.pos.y + 13)
            this.graphics.lineTo(this.pos.x + 20, this.pos.y)
        }
        if (this.roads["S"]) {
            this.graphics.moveTo(this.pos.x + 20, this.pos.y + 13)
            this.graphics.lineTo(this.pos.x + 20, this.pos.y + 26)
        }
        if (this.roads["E"]) {
            this.graphics.moveTo(this.pos.x + 20, this.pos.y + 13)
            this.graphics.lineTo(this.pos.x + 40, this.pos.y + 13)
        }
        if (this.roads["W"]) {
            this.graphics.moveTo(this.pos.x + 20, this.pos.y + 13)
            this.graphics.lineTo(this.pos.x, this.pos.y + 13)
        }
    
    }

    setActive() {
        this.graphics.alpha = 0.5;
    }

    setInactive() {
        this.graphics.alpha = 1.0;
    }

    updateRoad(direction) {
        if (this.roads[direction] != null) {
            this.roads[direction] = !this.roads[direction];
        }
        this.renderCard();
    }
}