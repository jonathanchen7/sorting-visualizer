// Bubble Sort implementation.
export const bubbleSort = arr => {
    const animations = [];
    let len = arr.length;
    let anySwaps = false;

    for (let i = 0; i < len - 1; i++) {
        anySwaps = false;
        for (let j = 0; j < len - 1 - i; j++) {
            animations.push([-1, j, j + 1])
            if (arr[j] > arr[j + 1]) {
                anySwaps = true;
                animations.push([0, j + 1, j]);
                animations.push([2, j + 1, j]);
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            } else {
                animations.push([0, j, j + 1]);
            }
        }

        if (anySwaps === false) {
            break;
        }
    }
    return [
        animations,
        arr
    ];
}

// Insertion Sort implementation.
export const insertionSort = arr => {
    const animations = [];
    let len = arr.length;

    // Iterates through all values of the array (excluding the first index).
    for (let i = 1; i < len; i++) {
        animations.push([-1, i, i]);
        let currentIndex = i;
        // Shifts the values in the array until the current value is sorted.
        while (currentIndex - 1 >= 0 && arr[currentIndex] < arr[currentIndex - 1]) {
            animations.push([0, currentIndex, currentIndex - 1]);
            animations.push([1, currentIndex, currentIndex - 1]);
            animations.push([2, currentIndex, currentIndex - 1]);
            let temp = arr[currentIndex];
            arr[currentIndex] = arr[currentIndex - 1];
            arr[currentIndex - 1] = temp;
            currentIndex--;
        }
    }

    return [
        animations,
        arr
    ];
};

// Selection Sort implementation that returns both an array of animations + the sorted array.
export const selectionSort = arr => {
    const animations = [];
    let len = arr.length;

    for (let i = 0; i < len; i++) {
        let minIndex = i;
        /* Each comparison pushes a pair of indices to animations, with the index corresponding to the 
        lower value as the first index in the pair.*/
        for (let j = i + 1; j < len; j++) {
            if (arr[minIndex] > arr[j]) {
                animations.push([0, j, minIndex]);
                minIndex = j;
            } else {
                animations.push([0, minIndex, j]);
            }
        }

        animations.push([0, minIndex, i]);
        animations.push([1, minIndex, i]);
        let temp = arr[minIndex];
        arr[minIndex] = arr[i];
        arr[i] = temp;
    }

    return [
        animations,
        arr
    ];
};

export const quickSort = (arr, lo, hi) => {
    const animations = [];
    quickSortHelp(animations, arr, lo, hi);

    return [
        animations,
        arr
    ];
};

function quickSortHelp(animations, arr, lo, hi) {
    if (lo < hi) {
        var partitionIndex = quickSortPartition(animations, arr, lo, hi);

        quickSortHelp(animations, arr, lo, partitionIndex - 1);
        quickSortHelp(animations, arr, partitionIndex + 1, hi);
    }
}

function quickSortPartition(animations, arr, lo, hi) {
    animations.push([-2, lo, hi]);
    animations.push([-1, hi, hi]);
    const pivot = arr[hi];
    let swapIndex = lo;

    for (let i = lo; i < hi; i++) {
        // If the current element is smaller than the pivot, swap with the element at swapIndex.
        if (arr[i] < pivot) {
            animations.push([0, i, hi]);
            animations.push([1, i, swapIndex]);
            let temp = arr[i];
            arr[i] = arr[swapIndex];
            arr[swapIndex] = temp;
            swapIndex++;
        } else {
            animations.push([0, hi, i]);
        }
    }
    animations.push([2, hi, swapIndex]);
    let temp = arr[hi];
    arr[hi] = arr[swapIndex];
    arr[swapIndex] = temp;
    return swapIndex;
}