export default function calculateGridValues(rows, cols, locations) {
    const gridValues = Array.from(Array(rows), () => Array(cols).fill(0));

    locations.forEach(([x, y]) => {
        for(let dx=-1; dx<=1; dx++) {
            for(let dy=-1; dy<=1; dy++) {
                if(x+dx >=0 && x+dx<rows && y+dy>=0 && y+dy<cols) {
                    gridValues[x+dx][y+dy]++;
                }
            }
        }
    })

    return gridValues;
}