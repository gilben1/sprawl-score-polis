
const colorMap = {
    "Resident": 0xD69642,
    "Park": 0x298F2E,
    "Commercial": 0x000DFF,
    "Industry": 0x555555,
    "Blank": 0xDDDDDD
}

class Director {
    
    board
    rows
    columns
    activeBlock
    activeButton
    buttons = []
    score

    // pixi
    app
    id

    mouseDown

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
        this.buttons[0] = new Button("Resident", 0, this.rows + 1);
        this.buttons[1] = new Button("Park", 1, this.rows + 1);
        this.buttons[2] = new Button("Commercial", 2, this.rows + 1);
        this.buttons[3] = new Button("Industry", 3, this.rows + 1);
        this.buttons[4] = new Button("Blank", 4, this.rows + 1);

        // link the buttons together for easy cycling
        this.buttons[0].setNextButton(this.buttons[1]);
        this.buttons[1].setNextButton(this.buttons[2]);
        this.buttons[2].setNextButton(this.buttons[3]);
        this.buttons[3].setNextButton(this.buttons[4]);
        this.buttons[4].setNextButton(this.buttons[0]);

        for (let but of this.buttons) {
            this.app.stage.addChild(but.graphics);
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
        this.score.updateLargest(this.board);
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

    addRoads(direction) {
        if (this.activeBlock == null) return;
        this.activeBlock.updateRoad(direction);
    }

}