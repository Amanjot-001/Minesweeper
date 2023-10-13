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
                    />
                );
            }
            grid.push(
                <div key={i} className="row">
                    {row}
                </div>
            );
        }

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