import PropTypes from 'prop-types'
import Cell from "./Cell"
import '../styles/grid.css'
import { useState, useEffect } from 'react';
import generateBombLocations from "../utils/generateBombLocations";
import calculateGridValues from "../utils/calculateGridValues"

export default function Board({rows, cols, bombs}) {
    const [locations, setLocations] = useState(generateBombLocations(rows, cols, bombs));
    const [gridValues, setGridValues] = useState(calculateGridValues(rows, cols, locations));

    useEffect(() => {
        const bombLocations = generateBombLocations(rows, cols, bombs);
        setLocations(bombLocations);
        console.log(bombLocations)
    
        const values = calculateGridValues(rows, cols, bombLocations);
        setGridValues(values);
    }, []);

    const [cellStates, setCellStates] = useState(() => {
        const initialStates = [];
        for (let i = 0; i < rows; i++) {
          initialStates.push(Array(cols).fill(false));
        }
        // console.log(initialStates)
        return initialStates;
    });

    const onCellClick = (x, y) => {
        if (cellStates[x][y] === false) {
            revealEmptyCells(x, y);
        }
    };

    const revealEmptyCells = (x, y) => {
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

        setCellStates((prevCellStates) => {
            let updatedCellStates = [...prevCellStates];
            updatedCellStates[x][y] = true;

            neighborCells.forEach(([dx, dy]) => {
                const newRow = x + dx;
                const newCol = y + dy;

                if(
                    newRow >=0 &&
                    newRow < rows && 
                    newCol >=0 &&
                    newCol < cols &&
                    !updatedCellStates[newRow][newCol] &&
                    gridValues[newRow][newCol] === 0
                ) {
                    revealEmptyCells(newRow, newCol);
                }
            });

            return updatedCellStates;
        });
    }
    
    return (
        <div className="grid">
            {cellStates.map((rows, rowIndex) => (
                <div key={rowIndex} className='row'>
                    {rows.map((showed, colIndex) => (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            showed={showed}
                            x={rowIndex}
                            y={colIndex}
                            flagged={false}
                            value={gridValues[rowIndex][colIndex]}
                            hasBomb={locations.some(([x, y]) => x === rowIndex && y === colIndex)}
                            onCellClick={onCellClick}
                       />
                    ))}
                </div>
            ))}
        </div>
    )
}

Board.propTypes = {
    rows: PropTypes.number,
    cols: PropTypes.number,
    bombs: PropTypes.number
}