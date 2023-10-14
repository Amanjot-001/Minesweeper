import PropTypes from 'prop-types'
import { useState } from 'react'
import '../styles/cell.css'

export default function Cell({ showed, x, y, value, hasBomb, onCellClick }) {
    const [clicked, setClicked] = useState(false);
    const [flagged, setFlagged] = useState(false);

    const handleLeftClick = () => {
        if(!flagged) {
            setClicked(true);
            onCellClick(x, y);
        }
    }

    const handleRightClick = (e) => {
        e.preventDefault();
        if(!clicked && !showed)
            setFlagged(true);
    }

    return (
        <div className="cell" onClick={handleLeftClick} onContextMenu={handleRightClick}>
            {(showed || clicked) ? ((hasBomb ? 'X' : value)) : (flagged ? 'F' : null) }
        </div>
    )
}

Cell.propTypes = {
    showed: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number,
    value: PropTypes.number,
    hasBomb: PropTypes.bool,
    onCellClick: PropTypes.func
}