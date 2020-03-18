export const selectionSort = array => {
    const sortedArray = array.slice(0);

    for (let i = 0; i < sortedArray.length; i++) {
        let minIndex = 0;
        for (let j = i + 1; j < sortedArray.length; j++) {
            minIndex = Math.min(sortedArray[minIndex], sortedArray[j]);
        }
        let temp = sortedArray[minIndex];
        sortedArray[minIndex] = sortedArray[i];
        sortedArray[i] = temp;
    }
    return sortedArray;
};