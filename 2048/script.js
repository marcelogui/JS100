const boardCells = Array.from(document.querySelectorAll('.board-cell'));
let boardNumbers = Array(16).fill(0);

restartGame();

document.querySelector('.board').addEventListener('click', () => createRandomCell());

document.addEventListener('keydown', function(event){
    if(event.key === 'ArrowRight'){
        mergeRight();
    }
    if(event.key === 'ArrowLeft'){
        mergeLeft();
    }
    if(event.key === 'ArrowDown'){
        mergeDown();
    }
    if(event.key === 'ArrowUp'){
        mergeUp();
    }
    renderBoardFromNumbers();
    createRandomCell();
})

function restartGame(){
    boardCells.forEach(function(cell){
        cell.innerText = '';
        cell.classList = 'board-cell';
    })

    boardNumbers.fill(0);
    createRandomCell();
}

function renderBoardFromNumbers(){
    for(let i = 0; i < boardNumbers.length; i++){
        boardCells[i].classList = 'board-cell';
        if(boardNumbers[i] != 0) {
            boardCells[i].innerText = boardNumbers[i];
            boardCells[i].classList.add(`cell-number-${boardNumbers[i]}`);
        }
        else{
            boardCells[i].innerText = '';
        }
    }
}

function createRandomCell(){
    const candidateCells = boardCells.filter(function(cell){
        return !cell.innerText;
    });

    const createdCell = candidateCells[Math.floor(Math.random() * candidateCells.length)];
    const createdCellIndex = boardCells.findIndex((cell) => cell === createdCell);
    boardNumbers[createdCellIndex] = 2;

    createdCell.innerText = '2';
    createdCell.classList.add('cell-number-2');
    createdCell.style.animation = 'created 0.15s ease-out forwards';
}

function mergeRight(){
    const startIndexes = [0, 4, 8, 12];
    for(let index of startIndexes){
        const row = boardNumbers.slice(index, index + 4);
        const filteredRow = row.filter((cell) => cell > 0).reverse();
        const newRow = merge(filteredRow).reverse();
        for(let i = index; i<index+4; i++){
            boardNumbers[i] = newRow[i - index];
        }
    }
}

function mergeLeft(){
    const startIndexes = [0, 4, 8, 12];
    for(let index of startIndexes){
        const row = boardNumbers.slice(index, index + 4);
        const filteredRow = row.filter((cell) => cell > 0);
        const newRow = merge(filteredRow);
        for(let i = index; i<index+4; i++){
            boardNumbers[i] = newRow[i - index];
        }
    }
}

function mergeDown(){
    const startIndexes = [0, 1, 2, 3];
    for(let index of startIndexes){
        const row = [boardNumbers[index],
                     boardNumbers[index + 4],
                     boardNumbers[index + 8],
                     boardNumbers[index + 12]
                    ];
        const filteredRow = row.filter((cell) => cell > 0).reverse();
        const newRow = merge(filteredRow).reverse();
        for(let i = 0; i<4; i++){
            boardNumbers[index + i*4] = newRow[i];
        }
    }
}

function mergeUp(){
    const startIndexes = [0, 1, 2, 3];
    for(let index of startIndexes){
        const row = [boardNumbers[index],
                     boardNumbers[index + 4],
                     boardNumbers[index + 8],
                     boardNumbers[index + 12]
                    ];
        const filteredRow = row.filter((cell) => cell > 0);
        const newRow = merge(filteredRow);
        for(let i = 0; i<4; i++){
            boardNumbers[index + i*4] = newRow[i];
        }
    }
}

function merge(row){
    const newRow = [];
    while(newRow.length < 4){
        if(row.length > 1){
            if(row[0] === row[1]){
                newRow.push(row[0] + row[1]);
                row.splice(0, 2);
            }
            else{
                newRow.push(row[0]);
                row.splice(0, 1);
            }
        }
        else if(row.length === 1){
            newRow.push(row[0]);
            row.splice(0, 1);
        }
        else{
            newRow.push(0);
        }
    }
    console.log(newRow);
    return newRow;
}