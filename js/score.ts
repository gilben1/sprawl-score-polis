class Score {

    largest = {
        "Resident": 0,
        "Park": 0,
        "Commercial": 0,
        "Industry": 0
    }
    cardScores = {
        2: [0, 0],
        3: [0, 0],
        5: [0, 0],
        7: [0, 0],
        10: [0, 0],
        17: [0, 0],
        18: [0, 0]
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
        let overallScore = total + roadCount;

        this.cardScores[2] = this.scoreCard2(board);
        this.cardScores[3] = this.scoreCard3(board);
        this.cardScores[5] = this.scoreCard5(board);
        this.cardScores[6] = this.scoreCard6(board);
        this.cardScores[7] = this.scoreCard7(board);
        this.cardScores[10] = this.scoreCard10(board);
        this.cardScores[17] = this.scoreCard17(board);
        this.cardScores[18] = this.scoreCard18(board);


        scoreDiv.innerHTML = `
            ===========<br>
            Score:<br>
            ===========<br>
            Resident: ${this.largest["Resident"]}<br>
            Park: ${this.largest["Park"]}<br>
            Commercial: ${this.largest["Commercial"]}<br>
            Industry: ${this.largest["Industry"]}<br>
            Blocks Total: ${total}<br>
            -----------<br>
            Roads: ${roadCount}<br>
            -----------<br>
            Overall Score: ${overallScore}<br>
            -----------<br>
            Card 2 "Bloom Boom" Score: +${this.cardScores[2][0]}, ${this.cardScores[2][1]}<br>
            Card 3 "Go Green" Score: +${this.cardScores[3][0]}, ${this.cardScores[3][1]}<br>
            Card 5 "Stacks And Scrapers:" Score: +${this.cardScores[5][0]}, ${this.cardScores[5][1]}<br>
            Card 6 "Master Planned" Score: +${this.cardScores[6][0]}, ${this.cardScores[6][1]}<br>
            Card 7 "Central Perks" Score: +${this.cardScores[7][0]}, ${this.cardScores[7][1]}<br>
            Card 10 "The Strip" Score: +${this.cardScores[10][0]}, ${this.cardScores[10][1]}<br>
            Card 18 "Tourist Traps" Score: +${this.cardScores[17][0]}, ${this.cardScores[17][1]}<br>
            Card 18 "Sprawlopolis" Score: +${this.cardScores[18][0]}, ${this.cardScores[18][1]}<br>
            
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
        return roadCount * -1;
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

    // Card 2: Bloom Boom
    scoreCard2(board) {
        // Rules: +1pt per column and row w/ exactly 3 park blocks
        //        -1pt per column and row w/ 0 park blocks
        let rowCounter = [...Array(board.length).fill(0)];
        let colCounter = [...Array(board[0].length).fill(0)];
        let rowBlank = [...Array(board.length).fill(true)];
        let colBlank = [...Array(board[0].length).fill(true)];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j].color == "Park") {
                    rowCounter[i]++;
                    colCounter[j]++;
                }
                // Set flag for a completely blank row and coloumn to ignore for calculation
                if (board[i][j].color != "Blank") {
                    rowBlank[i] = false;
                    colBlank[j] = false;
                }
            }
        }
        let positive = 0;
        let negative = 0;
        for (let i = 0; i < rowCounter.length; i++) {
            if (!rowBlank[i]) {
                if (rowCounter[i] == 3) {
                    positive++
                }
                else if (rowCounter[i] == 0) {
                    negative++
                }
            }
            if (!colBlank[i]) {
                if (colCounter[i] == 3) {
                    positive++
                }
                else if (colCounter[i] == 0) {
                    negative++
                }
            }
        }
        return [positive, negative]
    }

    // Card 3: Go Green
    scoreCard3(board) {

        // Rules: +1 / Park in City, -3 per Industrial
        let parks = 0;
        let industry = 0;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j].color == "Park") {
                    parks++;
                }
                else if (board[i][j].color == "Industry") {
                    industry++;
                }
            }
        }
        return [parks, industry * -3]
    }
    
    // Card 5: Stacks and Scraper
    scoreCard5(board) {

        // Rules: +2 / industrial block only adjacent to industrial or commerical blocks
        let sum = 0
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j].color == "Industry") {
                    let adjacentColors = board[i][j].getAdjacentColors();
                    // we only have commercial and industry adjacent to us
                    if (JSON.stringify(adjacentColors.sort()) == JSON.stringify(["Commercial", "Industry"])
                    ||  JSON.stringify(adjacentColors) == JSON.stringify(["Commercial"])
                    ||  JSON.stringify(adjacentColors) == JSON.stringify(["Industry"])
                    ) {
                        sum++
                    }
                }
            }
        }
        return [sum * 2, 0]
    }
    
    // Card 6: Master Planned
    scoreCard6(board) {

        // Rules: Subtract largest industrial group from largest residential group, score that many points
        return [this.largest["Resident"] - this.largest["Industry"], 0]
    }
    
    // Card 7: Central Perks
    scoreCard7(board) {

        // Rules: +1 / parks not on the edge, -2 per parks on the edge
        let inner = 0;
        let outer = 0;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j].color == "Park") {
                    if (board[i][j].isEdge) {
                        outer++;
                    }
                    else {
                        inner++;
                    }
                }
            }
        }
        return [inner, outer * -2]
    }


    // Card 10: The Strip
    scoreCard10(board) {
        // Rules: Column or Row w/ the greatest number of "Commercial" blocks
        //  +1 pt per Commercial block in that column
        let rowCounter = [...Array(board.length).fill(0)];
        let colCounter = [...Array(board[0].length).fill(0)];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j].color == "Commercial") {
                    rowCounter[i]++;
                    colCounter[j]++;
                }
            }
        }
        return [Math.max(Math.max(...rowCounter),Math.max(...colCounter)), 0]
    }

    // Card 17: Tourist Traps
    scoreCard17(board) {
        // Rules: 1pt / Commercial block on the edge, + 1 more if that is a corner edge
        let sum = 0;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j].color == "Commercial") {
                    if (board[i][j].isEdge) {
                        sum++
                    }
                    if (board[i][j].isCorner()) {
                        sum++
                    }
                }
            }
        }
        return [sum, 0]
    }

    // Card 18: Sprawlopolis
    scoreCard18(board) {
        // Rules: Add number of blocks in longest column + number of blocks in longest row
        let rowCounter = [...Array(board.length).fill(0)];
        let colCounter = [...Array(board[0].length).fill(0)];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j].color != "Blank") {
                    rowCounter[i]++;
                    colCounter[j]++;
                }
            }
        }
        return [Math.max(...rowCounter) + Math.max(...colCounter), 0]
    }
}