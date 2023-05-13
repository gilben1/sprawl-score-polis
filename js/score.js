class Score {

    largest = {
        "Resident": 0,
        "Park": 0,
        "Commercial": 0,
        "Industry": 0
    }
    visitBoard = [[],[]];

    constructor(rows, columns) {
        this.visitBoard = [...Array(rows)].map(e => Array(columns).fill(0));
    }

    updateLargest(board) {
        this.calculateLargestGroup("Resident", board);
        this.calculateLargestGroup("Park", board);
        this.calculateLargestGroup("Commercial", board);
        this.calculateLargestGroup("Industry", board);
        let scoreDiv = document.getElementById("scoreDiv");
        let total = 0
        for (const [key, value] of Object.entries(this.largest)) {
            total += value;
        }
        scoreDiv.innerHTML = `
            Resident: ${this.largest["Resident"]}
            Park: ${this.largest["Park"]}
            Commercial: ${this.largest["Commercial"]}
            Industry: ${this.largest["Industry"]}
            Total: ${total}
        `
    }


    calculateLargestGroup(color, board) {
        let largestGroup = 0;
        this.visitBoard = [...Array(this.visitBoard.length)].map(e => Array(this.visitBoard[0].length).fill(0));
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                // We've matched the color
                if (board[i][j].color == color && this.visitBoard[i][j] == 0) {
                    // find adjacent
                    let groupCount = this.findGroupMembers(color, board, i, j);
                    if (groupCount > largestGroup) {
                        largestGroup = groupCount;
                    }
                }
            }
        }
        this.largest[color] = largestGroup;
    }

    findGroupMembers(color, board, i, j) {
        // out of bounds or visited
        if (i < 0 || j < 0 || i >= board.length || j >= board[i].length || this.visitBoard[i][j] == 1) {
            return 0;
        }
        else if (board[i][j].color != color) {
            // mark this cell as visited
            this.visitBoard[i][j] = 1;
            return 0;
        }
        else { // in bounds and the matching color
            console.log("color matched!")
            this.visitBoard[i][j] = 1;
            return this.findGroupMembers(color, board, i - 1, j) +
                this.findGroupMembers(color, board, i + 1, j) +
                this.findGroupMembers(color, board, i, j - 1) +
                this.findGroupMembers(color, board, i, j + 1) + 1
        }

    }
}