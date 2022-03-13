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
function updateSliderPreview() {
    preview = document.querySelector('.slider-preview');
    preview.textContent = this.value;
}

// adds functionality to grid sizing
function gridSliderSizing() {
    let slider = document.querySelector('#grid-slider');
    let sliderConfirm = document.querySelector('.grid-confirm');
    slider.addEventListener('input', updateSliderPreview); // for when the slider is only being dragged
    sliderConfirm.addEventListener('click', updateGridFromSlider); // for when the slider size is confirmed
}

// removes all event listener from all squares
function removeDrawingListenersFromAll() {
    let grid = document.querySelectorAll('.noncolored-square');
    grid.forEach((square) => { square.replaceWith(square.cloneNode(true)); })
}

// helper function that adds listeners with event type to squares w/o the class 'colored'
function squareAddEventListeners(mouseEvent, eventListener) {
    let grid = document.querySelectorAll('.noncolored-square');
    grid.forEach((square) => {
        if (!square.classList.contains('colored')) {
            square.addEventListener(mouseEvent, eventListener);
        } else {
            return;
        }
    })
}

// click-n-drag listeners to the squares
// so when the user 'clicks and drag', the boxes need to do as follows:
// when the user 'clicks', turns all the box listeners into 'hover' as the user
// has clicked down, also add the event listener of 'mouseup' signifying the user has
// released their mouse, thus turning all box listeners back into 'clicks'
function clicknDrag() {
    color = document.querySelector('#Color');
    this.style.backgroundColor = color.value;
    this.removeEventListener('mousedown', clicknDrag)
    // then toggles on the hover
    removeDrawingListenersFromAll();
    squareAddEventListeners('mouseover', hoverDrawing);
}

// hover listeners to the squares (the default)
function hoverDrawing() {
    color = document.querySelector('#Color');
    // console.log(color);
    this.style.backgroundColor = color.value;
    this.classList.add('colored')
    // console.log(this.classList)
    this.removeEventListener('mouseover', hoverDrawing);
}

// adds the hover option functionality
function addHoverOption() {
    hoverBtn = document.querySelector('.hover-option');
    hoverBtn.addEventListener('click', () => {
        removeDrawingListenersFromAll(); // first removes all listeners
        squareAddEventListeners('mouseover', hoverDrawing); // then adds hover listeners to all non-colored squares
    });
}

// adds the click-n-drag option functionality
function addClicknDrag() {
    dragBtn = document.querySelector('.click-option');
    dragBtn.addEventListener('mousedown', () => {
        removeDrawingListenersFromAll();
        squareAddEventListeners('mousedown', clicknDrag);
    });
}

function main() {
    createGrid(10);
    gridSliderSizing(); // functionality of grid slider
    // by default, adds hover drawing event listener
    squareAddEventListeners('mouseover', hoverDrawing);
    addHoverOption();
    addClicknDrag();
}

main()