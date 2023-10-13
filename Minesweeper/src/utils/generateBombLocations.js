export default function generateBombLocations(rows, cols, bombs) {
    const locations = [];

    while(locations.length < bombs) {
        const x = Math.floor(Math.random() * rows);
        const y = Math.floor(Math.random() * cols);

        if(!locations.some(([i, j]) => i===x && j===y)) {
            locations.push([x, y]);
        }
    }

    return locations;
}