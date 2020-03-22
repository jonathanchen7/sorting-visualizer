// Selection Sort implementation that returns both an array of animations + the sorted array.
export const selectionSort = arr => {
    const animations = [];
    const arrCopy = arr.slice();
    let len = arrCopy.length;

    for (let i = 0; i < len; i++) {
        let minIndex = i;
        /* Each comparison pushes a pair of indices to animations, with the index corresponding to the 
        lower value as the first index in the pair.*/
        for (let j = i + 1; j < len; j++) {
            if (arrCopy[minIndex] > arrCopy[j]) {
                animations.push([0, j, minIndex]);
                minIndex = j;
            } else {
                animations.push([0, minIndex, j]);
            }
        }

        animations.push([0, minIndex, i]);
        animations.push([1, minIndex, i]);
        let temp = arrCopy[minIndex];
        arrCopy[minIndex] = arrCopy[i];
        arrCopy[i] = temp;
    }

    return [
        animations,
        arrCopy
    ];
};

// Insertion Sort implementation.
export const insertionSort = arr => {
    const animations = [];
    const arrCopy = arr.slice();
    let len = arrCopy.length;

    // Iterates through all values of the array (excluding the first index).
    for (let i = 1; i < len; i++) {
        animations.push([-1, i, i]);
        let currentIndex = i;
        // Shifts the values in the array until the current value is sorted.
        while (currentIndex - 1 >= 0 && arrCopy[currentIndex] < arrCopy[currentIndex - 1]) {
            animations.push([0, currentIndex, currentIndex - 1]);
            animations.push([1, currentIndex, currentIndex - 1]);
            animations.push([2, currentIndex, currentIndex - 1]);
            let temp = arrCopy[currentIndex];
            arrCopy[currentIndex] = arrCopy[currentIndex - 1];
            arrCopy[currentIndex - 1] = temp;
            currentIndex--;
        }
    }

    return [
        animations,
        arrCopy
    ];
};