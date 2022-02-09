// creates a square and returns it
function createSquare(side) {
    let square = document.createElement('div');
    square.classList.add('noncolored-square');
    square.style.width = `${side}px`;
    square.style.height = `${side}px`;
    return square;
}

// creates a row with specified row #
function createRow(num) {
    let row = document.createElement('div');
    row.classList.add(`row-${num}`, 'row');
    return row;
}

// creates a grid of user chosen size n, NxN
// also returns the grid object so it can be passed to other functions
function createGrid(userSize) {
    let grid = document.querySelector('.grid-container');
    for (let i = 0; i < userSize; i++) {
        grid.appendChild(createRow(i));
        let row = document.querySelector(`.row-${i}`);
        for (let j = 0; j < userSize; j++) {
            row.append(createSquare());
        }
    }
    return grid;
}

// functionality of the color slider
function colorFunctionality(){
    return
}

// adds listeners to the grid so that it can be drawn on
function addDrawing(grid, color) {
    return
}


createGrid(20)