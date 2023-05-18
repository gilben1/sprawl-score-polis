
class Block {
    color // orange, blue, green, grey
    roads = {
        "N": false,
        "S": false,
        "E": false,
        "W": false,
    }
    visual
    pos = { // 0 is index, 1 is adjusted real
        x: [0,0],
        y: [0,0]
    }
    
    isEdge
    edges = {
        "N": false,
        "S": false,
        "E": false,
        "W": false,
    }


    graphics

    constructor (color, x, y) {
        this.color = color;
        this.pos.x[0] = x; // index
        this.pos.y[0] = y;
        this.pos.x[1] = x * 43 + 10; // real
        this.pos.y[1] = y * 29 + 10;
        this.isEdge = false;

        this.graphics = new Graphics();
        this.renderCard();
        this.graphics.interactive = true;

        this.graphics.on('pointerdown',(event) => {
            if (event.data.originalEvent.button == 0) {
                if (null !== director.activeButton) {
                    this.setColor(director.getSelectedColor());
                    director.updateScores();
                }
                director.mouseDown = true;
                director.updateActiveBlock(this);
                director.lastKeypress = null;
            }
            else if (event.data.originalEvent.button == 1) {
                if (this.color != director.buttons[this.color].color) {
                    director.updateActiveButton(director.buttons[this.color]);
                }
            }
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
        this.graphics.drawRect(this.pos.x[1], this.pos.y[1], 40, 26);
        if (this.roads["N"]) {
            this.graphics.moveTo(this.pos.x[1] + 20, this.pos.y[1] + 13)
            this.graphics.lineTo(this.pos.x[1] + 20, this.pos.y[1])
        }
        if (this.roads["S"]) {
            this.graphics.moveTo(this.pos.x[1] + 20, this.pos.y[1] + 13)
            this.graphics.lineTo(this.pos.x[1] + 20, this.pos.y[1] + 26)
        }
        if (this.roads["E"]) {
            this.graphics.moveTo(this.pos.x[1] + 20, this.pos.y[1] + 13)
            this.graphics.lineTo(this.pos.x[1] + 40, this.pos.y[1] + 13)
        }
        if (this.roads["W"]) {
            this.graphics.moveTo(this.pos.x[1] + 20, this.pos.y[1] + 13)
            this.graphics.lineTo(this.pos.x[1], this.pos.y[1] + 13)
        }
        
        if (this.isEdge && this.color != "Blank") {
            this.graphics.lineStyle(2, 0xFF0000);
            if (this.edges["N"]) {
                this.graphics.moveTo(this.pos.x[1], this.pos.y[1]);
                this.graphics.lineTo(this.pos.x[1] + 40, this.pos.y[1]);
            }
            if (this.edges["W"]) {
                this.graphics.moveTo(this.pos.x[1], this.pos.y[1]);
                this.graphics.lineTo(this.pos.x[1], this.pos.y[1] + 26);
            }
            if (this.edges["E"]) {
                this.graphics.moveTo(this.pos.x[1] + 40, this.pos.y[1]);
                this.graphics.lineTo(this.pos.x[1] + 40, this.pos.y[1] + 26);
            }
            if (this.edges["S"]) {
                this.graphics.moveTo(this.pos.x[1], this.pos.y[1] + 26);
                this.graphics.lineTo(this.pos.x[1] + 40, this.pos.y[1] + 26);
            }
        }
    
    }

    setActive() {
        this.graphics.alpha = 0.5;
    }

    setInactive() {
        this.graphics.alpha = 1.0;
    }

    updateRoad(direction) {
        if (this.color == "Park") {
            this.clearRoads();
            this.renderCard();
            return; // parks can't have roads
        }

        if (director.lastKeypress == null) {
            director.lastKeypress = direction;
            this.roads[opposites[direction]] = true;
        }
        else {
            this.clearRoads();
            if (direction != opposites[director.lastKeypress]) {
                this.roads[direction] = true;
                this.roads[opposites[director.lastKeypress]] = true;
            }
            director.lastKeypress = null;
            let newBlock = director.getAdjacentBlock(direction, this);
            director.updateActiveBlock(newBlock);
        }
        director.updateScores();
        
        this.renderCard();
    }

    emptyRoads() {
        for (const [key, value] of Object.entries(this.roads)) {
            if (value == true) {
                return false;
            }
        }
        return true;
    }

    fullRoads() {
        let count = 0;
        for (const [key, value] of Object.entries(this.roads)) {
            if (value == true) {
                return count++;
            }
        }
        return count == 2;

    }

    clearRoads() {
        this.roads["N"] = this.roads["S"] = this.roads["E"] = this.roads["W"] = false;
    }

    isCorner() {
        let count = 0;
        for (const [key, value] of Object.entries(this.edges)) {
            if (value == true && opposites[key] != true) {
                count++;
            }
        }

        return count == 2;
    }
}