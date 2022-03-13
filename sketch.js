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

// helper function to get rid of all previous nodes
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// creates a grid of user chosen size n, NxN
// also returns the grid object so it can be passed to other functions
function createGrid(userSize) {
    let grid = document.querySelector('.grid-container');
    removeAllChildNodes(grid);
    for (let i = 0; i < userSize; i++) {
        grid.appendChild(createRow(i));
        let row = document.querySelector(`.row-${i}`);
        for (let j = 0; j < userSize; j++) {
            row.append(createSquare());
        }
    }
    updateGridNumber(userSize)
    return grid;
}

// updates the display of the current grid size
function updateGridNumber(val) {
    let displayedVal = document.querySelector('.size-preview');
    displayedVal.textContent = val
}


// updates all values that result from slider being adjusted
function updateGridFromSlider() {
    val = document.querySelector('.slider-preview');
    createGrid(val.textContent);
}

// previews the size from slider
function updateSliderPreview(){
    preview = document.querySelector('.slider-preview');
    preview.textContent = this.value;
}

// adds functionality to grid sizing
function gridSizing() {
    let slider = document.querySelector('#grid-slider');
    let sliderConfirm = document.querySelector('.grid-confirm');
    slider.addEventListener('input', updateSliderPreview); // for when the slider is only being dragged
    sliderConfirm.addEventListener('click', updateGridFromSlider);
}

// functionality of the color picker
function colorFunctionality() {
    return
}

// click-n-drag listeners to the squares

// hover listeners to the squres

// adds listeners to the grid so that it can be drawn on
function addDrawing(grid, color, listener) {
    return
}

function main() {
    createGrid(10)
    gridSizing()
}

main()