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

    updateScores(board) {
        this.calculateLargestGroup("Resident", board);
        this.calculateLargestGroup("Park", board);
        this.calculateLargestGroup("Commercial", board);
        this.calculateLargestGroup("Industry", board);
        let roadCount = this.calculateTotalRoads(board);
        let scoreDiv = document.getElementById("scoreDiv");
        let total = 0
        for (const [key, value] of Object.entries(this.largest)) {
            total += value;
        }
        let overallScore = total - roadCount;

        scoreDiv.innerHTML = `
            Resident: ${this.largest["Resident"]}<br>
            Park: ${this.largest["Park"]}<br>
            Commercial: ${this.largest["Commercial"]}<br>
            Industry: ${this.largest["Industry"]}<br>
            Blocks Total: ${total}<br>
            -----------<br>
            Roads: -${roadCount}<br>
            -----------<br>
            Overall Score: ${overallScore}
            
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

    calculateTotalRoads(board) {
        let roadCount = 0;
        this.visitBoard = [...Array(this.visitBoard.length)].map(e => Array(this.visitBoard[0].length).fill(0));
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (this.visitBoard[i][j] == 0 && !board[i][j].emptyRoads()) {
                    roadCount += (this.findConnectedRoads(board, i, j, " ") > 0) ? 1 : 0;
                }
                else {
                    this.visitBoard[i][j] == 1;
                }
            }
        }
        return roadCount;
    }

    findConnectedRoads(board, i, j, direction) {
        // out of bounds or visited
        if (i < 0 || j < 0 || i >= board.length || j >= board[i].length || this.visitBoard[i][j] == 1) {
            return 0;
        }
        // No roads here, just mark as visited
        if (board[i][j].emptyRoads()) {
            this.visitBoard[i][j] = 1;
            return 0;
        }
        // if we have the opposite of the last direction, continue the road
        if (board[i][j].roads[opposites[direction]] || direction == " ") {
            let search = 0;
            this.visitBoard[i][j] = 1;
            if (board[i][j].roads["N"] && direction != "S") {
                search += this.findConnectedRoads(board, i - 1, j, "N");
            }
            if (board[i][j].roads["S"] && direction != "N") {
                search += this.findConnectedRoads(board, i + 1, j, "S");
            }
            if (board[i][j].roads["W"] && direction != "E") {
                search += this.findConnectedRoads(board, i, j - 1, "W");
            }
            if (board[i][j].roads["E"] && direction != "W") {
                search += this.findConnectedRoads(board, i, j + 1, "E");
            }
            return search + 1;
        }
        else {
            // otherwise, return without counting it as a visit
            return 0;
        }
    }
}