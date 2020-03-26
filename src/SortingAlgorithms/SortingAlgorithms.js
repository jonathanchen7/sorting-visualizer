// Bubble Sort implementation that returns both an array of animations + the sorted array.
export const bubbleSort = arr => {
    const animations = [];
    let len = arr.length;
    let anySwaps = false;

    // Each iteration swaps the greatest element to sorted position on the right.
    for (let i = 0; i < len - 1; i++) {
        anySwaps = false;
        for (let j = 0; j < len - 1 - i; j++) {
            animations.push([-1, j, j + 1])
            if (arr[j] > arr[j + 1]) { // Swaps adjacent bars if left is greater than right.
                animations.push([0, j + 1, j]);
                animations.push([2, j + 1, j]);
                anySwaps = true;
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            } else {
                animations.push([0, j, j + 1]);
            }
        }

        // Breaks if there were no swaps in the previous loop (array is sorted).
        if (anySwaps === false) {
            break;
        }
    }
    return [
        animations,
        arr
    ];
}

// Insertion Sort implementation that returns both an array of animations + the sorted array.
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

    // Each iteration swaps the least element to sorted position on the left.
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[minIndex] > arr[j]) { // Updates minIdex if the current value is the new min. 
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

export const mergeSort = (arr) => {
    const animations = [];
    mergeSortHelp(animations, arr, arr.slice(), 0, arr.length - 1);

    return [
        animations,
        arr
    ];
};

function mergeSortHelp(animations, arr, aux, lo, hi) {
    if (lo < hi) {
        let mid = Math.floor((lo + hi) / 2);
        mergeSortHelp(animations, arr, aux, lo, mid);
        mergeSortHelp(animations, arr, aux, mid + 1, hi);

        mergeSortCombine(animations, arr, aux, lo, mid, hi);
    }
}

function mergeSortCombine(animations, arr, aux, lo, mid, hi) {
    // console.log("Aux Pre-Combine: " + aux);
    let index = lo;
    let i = lo;
    let j = mid + 1;
    
    while (i <= mid && j <= hi) {
        if (arr[i] <= arr[j]) {
            aux[index++] = arr[i++];
        } else {
            aux[index++] = arr[j++];
        }
    }

    while (i <= mid) {
        aux[index++] = arr[i++];
    }
    
    // while (j <= hi) {
    //     aux[index++] = arr[j++];
    // }

    for (let i = lo; i <= hi; i++) {
        arr[i] = aux[i];
    }
    // console.log("Aux Post-Combine: " + aux);
}

// Quick Sort implementation that returns both an array of animations + the sorted array.
export const quickSort = (arr) => {
    const animations = [];
    quickSortHelp(animations, arr, 0, arr.length - 1);

    return [
        animations,
        arr
    ];
};

// Recursive helper method for Quick Sort.
function quickSortHelp(animations, arr, lo, hi) {
    if (lo < hi) {
        var partitionIndex = quickSortPartition(animations, arr, lo, hi);

        quickSortHelp(animations, arr, lo, partitionIndex - 1);
        quickSortHelp(animations, arr, partitionIndex + 1, hi);
    }
}

// Partition method for Quick Sort.
function quickSortPartition(animations, arr, lo, hi) {
    animations.push([-2, lo, hi]);
    animations.push([-1, hi, hi]);
    const pivot = arr[hi];
    let swapIndex = lo;

    // Iterates through the current partition.
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
    // Swaps pivot with current swapIndex (now elements to the left <= pivot <= elements to the right)
    animations.push([2, hi, swapIndex]);
    let temp = arr[hi];
    arr[hi] = arr[swapIndex];
    arr[swapIndex] = temp;
    return swapIndex;
}