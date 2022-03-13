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

// click-n-drag listeners to the squares
function clicknDrag() {
    color = document.querySelector('#Color');
    this.style.backgroundColor = color.value;
    this.classList.add('colored');
    this.removeEventListener('click', clicknDrag)
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

// adds listeners to the grid so that it can be drawn on
function addDrawingListener(coloringListener) {
    let grid = document.querySelectorAll('.noncolored-square');
    grid.forEach((square) => {
        // removing all current listeners
        square.removeEventListener('mouseover', hoverDrawing);
        square.removeEventListener('click', clicknDrag);
        // if the current square is already colored, continue to next square
        if (!square.classList.contains('colored')) {
            if (coloringListener == hoverDrawing) {
                listenerType = 'mouseover';
            } else if (coloringListener == clicknDrag) {
                listenerType = 'click';
            }
            console.log(listenerType)
            square.addEventListener(listenerType, coloringListener);
        } else {
            return;
        };
    });
}

// adds the hover option functionality
function addHoverOption() {
    hoverBtn = document.querySelector('.hover-option');
    hoverBtn.addEventListener('click', () => {
        addDrawingListener(hoverDrawing);
    });
}

// adds the click-n-drag option functionality
function addClicknDrag() {
    dragBtn = document.querySelector('.click-option');
    dragBtn.addEventListener('click', () => {
        addDrawingListener(clicknDrag);
    });
}

function main() {
    createGrid(10);
    gridSliderSizing(); // functionality of grid slider
    addDrawingListener(hoverDrawing); // adds the default hover drawing listeners
    addHoverOption();
    addClicknDrag();
}

main()