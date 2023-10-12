import Cell from "./Cell"

export default function Board({size, bombs}) {
    const generateGrid = () => {
        for(let i=0; i<size; i++) {
            for(let j=0; j<size; j++){
                return <Cell/>
            }
        }
    }
    return (
        generateGrid
    )
}