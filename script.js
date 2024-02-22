//Const
const CELL_INIT = 50;
const DEFAULT_COLOR = "#3d3d3d";
const RESET_COLOR = "#ffffff";
const ACTIVE_COLOR = "#0594d6";
const INACTIVE_COLOR = "#cccccc";

//Grid DOM
const gridDom = document.querySelector("#grid");
//Change grid btn
const changeGridBtn = document.querySelector("#change_grid");
//Reset grid btn
const resetGridBtn = document.querySelector("#reset");
//Default pen DOM
const defaultPenBtn = document.querySelector("#default_pen");
//Random pen DOM
const randomtPenBtn = document.querySelector("#random_pen");


//Sketch variables
let isDefaultColor = true;

/**
 * Function to draw grid
 * @param {*} cellNums 
 */
function drawGrid(cellNums) {
    widthCells = cellNums * 2;
    heightCells = cellNums;
    for (let rowId = 0; rowId < heightCells; rowId++) {
        //Create row div
        let row = document.createElement("div");
        row.classList.add("row");
        for (let cellId = 0; cellId < widthCells; cellId++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            row.append(cell);
            cell.addEventListener("mouseenter", () => {
                if (isDefaultColor) {
                    cell.style.backgroundColor = DEFAULT_COLOR;
                } else {
                    cell.style.backgroundColor = getColor();
                }
            });
        }
        gridDom.append(row);
    }
}

/**
 * Function to get random color
 * @returns
 */
function getColor() {
    // Generate random values for RGB components
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    // Construct the CSS color string
    let randomColor = 'rgb(' + red + ', ' + green + ', ' + blue + ')';

    return randomColor;
}

/**
 * Function to change grid
 * @param {*} cellNums 
 */
function changeGrid(cellNums) {
    //Clear grid
    gridDom.innerHTML = "";
    drawGrid(cellNums);
}

/**
 * Function to reset grid
 */
function resetGrid() {
    const cellList = document.querySelectorAll(".cell");
    for (let cell of cellList) {
        cell.style.backgroundColor = RESET_COLOR;
    }
}

/**
 * Function validate user input
 * @param {} cellNums 
 */
function isValid(cellNums) {
    if (cellNums % Math.floor(cellNums) === 0 && cellNums > 0 && cellNums <= 120) return true;
    return false;
}

//Event change grid
changeGridBtn.addEventListener("click", () => {
    let cellNums = 0;
    let valid = true;
    do {
        cellNums = prompt("Grid (2N x N)! Enter for value N (N > 0, N C Z, N <= 120):");
        valid = isValid(cellNums);
        if (!valid) {
            alert("Wrong input for N!!!");
        }
    } while (!valid);
    changeGrid(cellNums);
});

//Event reset grid
resetGridBtn.addEventListener("click", () => {
    resetGrid();
});

//Event change color
defaultPenBtn.addEventListener("click", () => {
    isDefaultColor = true;
    defaultPenBtn.style.backgroundColor = ACTIVE_COLOR;
    randomtPenBtn.style.backgroundColor = INACTIVE_COLOR;
});

randomtPenBtn.addEventListener("click", () => {
    isDefaultColor = false;
    defaultPenBtn.style.backgroundColor = INACTIVE_COLOR;
    randomtPenBtn.style.backgroundColor = ACTIVE_COLOR;
});

drawGrid(CELL_INIT);
defaultPenBtn.style.backgroundColor = ACTIVE_COLOR;