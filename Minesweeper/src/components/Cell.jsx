import PropTypes from 'prop-types'
import { useState } from 'react'
import '../styles/cell.css'
import revealEmptyCells from '../utils/revealEmptyCells';

export default function Cell({showed, x, y, flagged, value, hasBomb}) {
    const [clicked, setClicked] = useState(false);

    const handleCellClick = () => {
        setClicked(true);
        showed = true;

        if(value === 0)
            revealEmptyCells(x, y);
    }
    return (
        <div className="cell" onClick={handleCellClick}>
            {showed || clicked ? hasBomb ? 'X' : value : null }
        </div>
    )
}

Cell.propTypes = {
    showed: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number,
    flagged: PropTypes.bool,
    value: PropTypes.number,
    hasBomb: PropTypes.bool
}