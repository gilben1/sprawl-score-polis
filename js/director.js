
const colorMap = {
    "Resident": 0xD69642,
    "Park": 0x298F2E,
    "Commercial": 0x000DFF,
    "Industry": 0x555555,
    "Blank": 0xDDDDDD
}

const opposites = {
    "N": "S",
    "S": "N",
    "W": "E",
    "E": "W"
}

const adjacent = {
    "N": ["E", "W"],
    "S": ["E", "W"],
    "W": ["N", "S"],
    "E": ["N", "S"]
}

class Director {
    
    board
    rows
    columns
    activeBlock
    activeButton
    buttons = {
        "Resident": null,
        "Park": null,
        "Commercial": null,
        "Industry": null,
        "Blank": null
    }
    score
    lastKeypress = null;

    // pixi
    app
    id

    mouseDown

    drawRoads

    constructor(app, resources) {
        this.app = app;
        this.rows = 16;
        this.columns = 16;
        this.board = [[],[]];
        this.activeBlock = null;
        this.activeButton = null;
        this.mouseDown = false;
        this.score = new Score(this.rows, this.columns);
        
        for (let i = 0; i < this.rows; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.columns; j++) {
                this.board[i][j] = new Block("Blank", j, i);
                this.app.stage.addChild(this.board[i][j].graphics);
            }
        }
        console.info(this.board)

        // set up the block setting buttons
        this.buttons["Resident"] = new Button("Resident", 0, this.rows + 1);
        this.buttons["Park"] = new Button("Park", 1, this.rows + 1);
        this.buttons["Commercial"] = new Button("Commercial", 2, this.rows + 1);
        this.buttons["Industry"] = new Button("Industry", 3, this.rows + 1);
        this.buttons["Blank"] = new Button("Blank", 4, this.rows + 1);

        // link the buttons together for easy cycling
        this.buttons["Resident"].setNextButton(this.buttons["Park"]);
        this.buttons["Park"].setNextButton(this.buttons["Commercial"]);
        this.buttons["Commercial"].setNextButton(this.buttons["Industry"]);
        this.buttons["Industry"].setNextButton(this.buttons["Blank"]);
        this.buttons["Blank"].setNextButton(this.buttons["Resident"]);

        for (const [key, value] of Object.entries(this.buttons)) {
            this.app.stage.addChild(value.graphics);
        }

    }

    getSelectedColor() {
        return this.activeButton.color;
    }

    cycleColor() {
        if (this.activeButton == null) {
            return;
        } 

        this.updateActiveButton(this.activeButton.nextButton);
    }

    updateScores() {
        this.calculateEdges();
        this.score.updateScores(this.board);
    }

    updateActiveButton(newButton) {
        if (this.activeButton != null) {
            this.activeButton.setInactive();
        }
        if (this.activeButton == newButton) {
            this.activeButton = null;
        }
        else {
            this.activeButton = newButton;
            this.activeButton.setActive();
        }
    }

    updateActiveBlock(newBlock) {
        if (newBlock == null) return;
        if (this.activeBlock != null) {
            this.activeBlock.setInactive();
        }
        if (this.activeBlock == newBlock) {
            this.activeBlock = null;
        }
        else {
            this.activeBlock = newBlock;
            this.activeBlock.setActive();
        }
    }

    removeActiveBlock() {
        this.activeBlock.setInactive();
        this.activeBlock = null;
    }
    
    removeActiveButton() {
        this.activeButton.setInactive();
        this.activeButton = null;
    }

    addRoads(direction) {
        if (this.activeBlock == null) return;
        let drawRoads = document.getElementById("drawRoads");
        // if draw roads is checked, draw some roads!
        if (drawRoads.checked) {
            this.activeBlock.updateRoad(direction);
        }
        else { // otherwise, just move to the adjacent block
            let newBlock = this.getAdjacentBlock(direction, this.activeBlock);
            director.updateActiveBlock(newBlock);
        }
    }

    getAdjacentBlock(direction, block) {
        let newBlock = null;
        let x = block.pos.x[0];
        let y = block.pos.y[0];
        switch (direction) {
            case "N":
                y--;
                break;
            case "S":
                y++;
                break;
            case "W":
                x--; 
                break;
            case "E":
                x++;
                break;
        }
        if (x >= 0 && x < this.columns && y >= 0 && y < this.rows) {
            return this.board[y][x];
        }
        else {
            return null;
        }
    }

    calculateEdges() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                this.board[i][j].edges["N"] = false;
                this.board[i][j].edges["W"] = false;
                this.board[i][j].edges["S"] = false;
                this.board[i][j].edges["E"] = false;
                this.board[i][j].isEdge = true;

                // north edge
                if (i - 1 < 0 || this.board[i-1][j].color == "Blank") {
                    this.board[i][j].edges["N"] = true;
                    this.board[i][j].isEdge = true;
                }
                if (j - 1 < 0 || this.board[i][j-1].color == "Blank") {
                    this.board[i][j].edges["W"] = true;
                    this.board[i][j].isEdge = true;
                }
                if (i + 1 >= this.rows || this.board[i+1][j].color == "Blank") {
                    this.board[i][j].edges["S"] = true;
                    this.board[i][j].isEdge = true;
                }
                if (j + 1 >= this.columns || this.board[i][j+1].color == "Blank") {
                    this.board[i][j].edges["E"] = true;
                    this.board[i][j].isEdge = true;
                }

                this.board[i][j].renderCard();
            }
        }
    }

    clearActiveBlock() {
        this.activeBlock.clearRoads();
        this.activeBlock.color = "Blank";
        this.activeBlock.renderCard();
    }

    updateColor(color) {
        this.activeBlock.setColor(color);
        this.activeBlock.renderCard();
        this.updateScores();
    }

}