export const selectionSort = arr => {
    const arrCopy = arr.slice();
    let len = arrCopy.length;

    for (let i = 0; i < len; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arrCopy[minIndex] > arrCopy[j]) {
                minIndex = j;
            }
        }
        let temp = arrCopy[minIndex];
        arrCopy[minIndex] = arrCopy[i];
        arrCopy[i] = temp;

    }

    return arrCopy;
};

export const selectionSortAnimations = arr => {
    const animations = [];
    const arrCopy = arr.slice();
    let len = arrCopy.length;

    for (let i = 0; i < len; i++) {
        let minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arrCopy[minIndex] > arrCopy[j]) {
                animations.push([0, j, minIndex]);
                minIndex = j;
            } else {
                animations.push([0, minIndex, j]);
            }
        }

        animations.push([1, minIndex, i]);
        let temp = arrCopy[minIndex];
        arrCopy[minIndex] = arrCopy[i];
        arrCopy[i] = temp;

    }

    return animations;
};