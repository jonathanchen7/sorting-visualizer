// Selection Sort implementation.
export const sort = arr => {
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

// Selection Sort implementation that returns an array of animations.
export const sortingAnimations = arr => {
    const animations = [];
    const arrCopy = arr.slice();
    let len = arrCopy.length;

    for (let i = 0; i < len; i++) {
        let minIndex = i;
        /* Each comparison pushes a pair of indices to animations, with the index corresponding to the 
        lower value as the first index in the pair.*/
        for (let j = i + 1; j < len; j++) {
            if (arrCopy[minIndex] > arrCopy[j]) {
                animations.push([j, minIndex]);
                minIndex = j;
            } else {
                animations.push([minIndex, j]);
            }
        }

        animations.push([minIndex, i]);
        let temp = arrCopy[minIndex];
        arrCopy[minIndex] = arrCopy[i];
        arrCopy[i] = temp;

    }

    return animations;
};