
const colorMap = {
    "Resident": 0xFF0000,
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
                this.board[i][j] = new Block("Blank", 0, j, i);
                this.app.stage.addChild(this.board[i][j].graphics);
            }
        }
        console.info(this.board)

        this.buttons[0] = new Button("Resident", 0, this.rows + 1);
        this.buttons[1] = new Button("Park", 1, this.rows + 1);
        this.buttons[2] = new Button("Commercial", 2, this.rows + 1);
        this.buttons[3] = new Button("Industry", 3, this.rows + 1);
        this.buttons[4] = new Button("Blank", 4, this.rows + 1);

        for (let but of this.buttons) {
            this.app.stage.addChild(but.graphics);
        }

    }

}