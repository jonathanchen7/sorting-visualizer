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
                animations.push([j, minIndex]);
                animations.push([j, minIndex]);
                minIndex = j;
            } else {
                animations.push([minIndex, j]);
                animations.push([minIndex, j]);
            }
        }

        animations.push([minIndex, i]);
        animations.push([minIndex, i]);
        let temp = arrCopy[minIndex];
        arrCopy[minIndex] = arrCopy[i];
        arrCopy[i] = temp;

    }

    return animations;
};