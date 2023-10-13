export default function revealEmptyCells(row, col) {
    const neighborCells = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1],
        ];
    
    neighborCells.forEach(([dx, dy]) => {
        const newRow = row + dx;
        const newCol = col + dy;

        if(
            newRow >=0 &&
            newRow < rows && 
            newCol >=0 &&
            newCol < cols &&
            !gridValues[newRow][newCol].showed
        ) {
            if(gridValues[newRow][newCol].value === 0) {
                gridValues[newRow][newCol].showed = true;
                revealEmptyCells(newRow, newCol);
            }
            else {
                gridValues[newRow][newCol].showed = true;
            }
        }
    })
}