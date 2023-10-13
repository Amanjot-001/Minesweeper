import PropTypes from 'prop-types'
import Cell from "./Cell"
import '../styles/grid.css'
import generateBombLocations from "../utils/generateBombLocations";
import calculateGridValues from "../utils/calculateGridValues"

export default function Board({rows, cols, bombs}) {
    const generateGrid = () => {
        const grid = [];
        const locations = generateBombLocations(rows, cols, bombs);
        const gridValues = calculateGridValues(rows, cols, locations);

        const onCellClick = (x, y) => {
            revealEmptyCells(x, y);
        };

        const revealEmptyCells = (row, col) => {
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
                    !grid[newRow].props.children[newCol].props.showed
                ) {
                    if(gridValues[newRow][newCol].value === 0) {
                        grid[newRow].props.children[newCol] = (
                            <Cell
                              key={`${row}-${col}`}
                              showed={true}
                              x={row}
                              y={col}
                              flagged={false}
                              value={gridValues[row][col]}
                              hasBomb={false}
                              onCellClick={onCellClick}
                            />
                        );
                        console.log('revealed')
                        revealEmptyCells(newRow, newCol);
                    }
                    else {
                        grid[newRow].props.children[newCol] = (
                            <Cell
                              key={`${row}-${col}`}
                              showed={true}
                              x={row}
                              y={col}
                              flagged={false}
                              value={gridValues[row][col]}
                              hasBomb={false}
                              onCellClick={onCellClick}
                            />
                        );
                    }
                }
            })
        }

        for(let i=0; i<rows; i++) {
            const row = [];

            for(let j=0; j<cols; j++) {
                const hasBomb = locations.some(([x, y]) => x===i && y===j);
                const cellKey = `${i}-${j}`;

                row.push(
                    <Cell
                        key={cellKey}
                        showed={false}
                        x={i}
                        y={j}
                        flagged={false}
                        value={gridValues[i][j]}
                        hasBomb={hasBomb}
                        onCellClick={onCellClick}
                    />
                );
            }
            grid.push(
                <div key={i} className="row">
                    {row}
                </div>
            );
        }
        console.log(grid)
        return grid;
    }

    return (
        <div className="grid">{generateGrid()}</div>
    )
}

Board.propTypes = {
    rows: PropTypes.number,
    cols: PropTypes.number,
    bombs: PropTypes.number
}