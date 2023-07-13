function chunk(array, size) {
    const chunks = [];
    let index = 0;

    while (index < array.length) {
        chunks.push(array.slice(index, index + size));
        index += size;
    }

    return chunks;
}
const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9, 7, 8, 9];

const chunkedArray = chunk(myArray, 4);

console.log(chunkedArray);