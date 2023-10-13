import Cell from "./Cell"
import '../styles/grid.css'

export default function Board({rows, cols, bombs}) {
    const generateGrid = () => {
        const grid = [];

        for(let i=0; i<rows; i++) {
            const row = [];

            for(let j=0; j<cols; j++) {
                row.push(
                    <Cell
                        key={`${i}-${j}`}
                        showed={false}
                        x={i}
                        y={j}
                        flagged={false}
                        value={0}
                    />
                )
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