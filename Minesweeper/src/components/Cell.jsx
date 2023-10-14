import PropTypes from 'prop-types'
import { useState } from 'react'
import '../styles/cell.css'

export default function Cell({ showed, x, y, flagged, value, hasBomb, onCellClick }) {
    const [clicked, setClicked] = useState(false);

    const handleCellClick = () => {
        setClicked(true);
        onCellClick(x, y);
    }
    
    return (
        <div className="cell" onClick={handleCellClick}>
            {showed || clicked ? (hasBomb ? 'X' : value) : null }
        </div>
    )
}

Cell.propTypes = {
    showed: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number,
    flagged: PropTypes.bool,
    value: PropTypes.number,
    hasBomb: PropTypes.bool,
    onCellClick: PropTypes.func
}