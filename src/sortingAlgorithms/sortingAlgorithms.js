export const selectionSort = arr => {
    const arrCopy = arr.slice();
    let len = arrCopy.length;
    console.log(arrCopy);

    for (let i = 0; i < len; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arrCopy[minIndex] > arrCopy[j]) {
                minIndex = j;
            }
            minIndex = (arrCopy[minIndex] > arrCopy[j]) ? j : minIndex;
        }

        let temp = arrCopy[minIndex];
        arrCopy[minIndex] = arrCopy[i];
        arrCopy[i] = temp;

    }
    return arrCopy;
};