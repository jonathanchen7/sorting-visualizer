import React from 'react';
import './SortingVisualizer.css';
import * as SortingAlgorithms from '../SortingAlgorithms/SortingAlgorithms.js'

const DEBUG = false;

const ANIMATION_SPEED_MS = 50;
const NUM_ARRAY_BARS = 15;

// Colors used in the sorting visualizer.
const PRIMARY_COLOR = '#484f8f';
const CURRENT_COMPARISON = 'pink';
const HIGHER_NUM_COLOR = 'red';
const LOWER_NUM_COLOR = 'green';
const SINGLE_SELECTION = 'yellow';

// const PRIMARY_COLOR = '#989dca';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    // Runs when the component is initially loaded.
    componentDidMount() {
        this.resetArray();
    }

    // Creates an int array of length ___
    resetArray() {
        const array = [];

        for (let i = 0; i < NUM_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 65));
        }

        this.setState({ array });
    }

    // Handles animations for Bubble Sort.
    bubbleSort() {
        const results = SortingAlgorithms.bubbleSort(this.state.array.slice());
        const animations = results[0];
        const sortedArray = results[1];

        const arrayBars = document.getElementsByClassName('array-bar');

        let [aIndexPrev, bIndexPrev] = [NUM_ARRAY_BARS - 1, NUM_ARRAY_BARS - 1];

        for (let i = 0; i < animations.length; i++) {
            const [swap, aIndex, bIndex] = animations[i];

            const aStyle = arrayBars[aIndex].style;
            const bStyle = arrayBars[bIndex].style;
            const aStylePrev = arrayBars[aIndexPrev].style;
            const bStylePrev = arrayBars[bIndexPrev].style;

            if (swap === -1) { // Selecting two bars.
                this.updateColors(aStyle, bStyle, CURRENT_COMPARISON, CURRENT_COMPARISON, aStylePrev, bStylePrev, i);
            } else if (swap === 0) { // Comparing two bars.
                this.updateColors(aStyle, bStyle, LOWER_NUM_COLOR, HIGHER_NUM_COLOR, aStylePrev, bStylePrev, i);
            } else { // Swapping positions of two bars.
                this.updateColors(aStyle, bStyle, HIGHER_NUM_COLOR, LOWER_NUM_COLOR, aStylePrev, bStylePrev, i);
                this.swapBars(aStyle, bStyle, i);
            }
            aIndexPrev = aIndex;
            bIndexPrev = bIndex;
        }

        this.disableButtons(animations.length);
        this.updateArrayState(sortedArray, animations.length);
        this.resetColors(arrayBars, animations.length);
    }

    // Handles animations for Insertion Sort.
    insertionSort() {
        const results = SortingAlgorithms.insertionSort(this.state.array.slice());
        const animations = results[0];
        const sortedArray = results[1];

        const arrayBars = document.getElementsByClassName('array-bar');

        let [aIndexPrev, bIndexPrev] = [NUM_ARRAY_BARS - 1, NUM_ARRAY_BARS - 1];

        for (let i = 0; i < animations.length; i++) {
            const [swap, aIndex, bIndex] = animations[i];

            const aStyle = arrayBars[aIndex].style;
            const bStyle = arrayBars[bIndex].style;
            const aStylePrev = arrayBars[aIndexPrev].style;
            const bStylePrev = arrayBars[bIndexPrev].style;

            if (swap === -1) {
                this.updateColors(aStyle, bStyle, SINGLE_SELECTION, SINGLE_SELECTION, aStylePrev, bStylePrev, i);
            } else if (swap === 0) {
                this.updateColors(aStyle, bStyle, CURRENT_COMPARISON, CURRENT_COMPARISON, aStylePrev, bStylePrev, i);
            } else if (swap === 1) {
                this.updateColors(aStyle, bStyle, LOWER_NUM_COLOR, HIGHER_NUM_COLOR, aStylePrev, bStylePrev, i);
            } else {
                this.updateColors(aStyle, bStyle, HIGHER_NUM_COLOR, LOWER_NUM_COLOR, aStylePrev, bStylePrev, i);
                this.swapBars(aStyle, bStyle, i);
            }

            aIndexPrev = aIndex;
            bIndexPrev = bIndex;
        }

        this.disableButtons(animations.length);
        this.updateArrayState(sortedArray, animations.length);
        this.resetColors(arrayBars, animations.length);
    }

    // Handles animations for Selection Sort.
    selectionSort() {
        const results = SortingAlgorithms.selectionSort(this.state.array.slice());
        const animations = results[0];
        const sortedArray = results[1];

        const arrayBars = document.getElementsByClassName('array-bar');

        if (DEBUG) console.log(animations);

        // Variables used to track the swapped array indices.
        let [aIndexPrev, bIndexPrev] = [NUM_ARRAY_BARS - 1, NUM_ARRAY_BARS - 1];

        for (let i = 0; i < animations.length; i++) {
            const [swap, aIndex, bIndex] = animations[i];

            const aStyle = arrayBars[aIndex].style;
            const bStyle = arrayBars[bIndex].style;
            const aStylePrev = arrayBars[aIndexPrev].style;
            const bStylePrev = arrayBars[bIndexPrev].style;

            if (swap) {
                if (DEBUG) console.log("Swap: " + animations[i]);
                this.updateColors(aStyle, bStyle, LOWER_NUM_COLOR, HIGHER_NUM_COLOR, aStylePrev, bStylePrev, i);
                this.swapBars(aStyle, bStyle, i);
            } else {
                if (DEBUG) console.log("Compare: " + animations[i]);
                this.updateColors(aStyle, bStyle, LOWER_NUM_COLOR, HIGHER_NUM_COLOR, aStylePrev, bStylePrev, i);
            }
            aIndexPrev = aIndex;
            bIndexPrev = bIndex;
        }

        this.disableButtons(animations.length);
        this.updateArrayState(sortedArray, animations.length);
        this.resetColors(arrayBars, animations.length);
    }

    // Handles animations for Merge Sort.
    mergeSort() {
        const results = SortingAlgorithms.mergeSort(this.state.array.slice());
        const animations = results[0];
        const sortedArray = results[1];

        this.updateArrayState(sortedArray, animations.length);
    }

    // Handles animations for Quick Sort.
    quickSort() {
        const results = SortingAlgorithms.quickSort(this.state.array.slice());
        const animations = results[0];
        const sortedArray = results[1];

        const arrayBars = document.getElementsByClassName('array-bar');

        let [aIndexPrev, bIndexPrev] = [NUM_ARRAY_BARS - 1, NUM_ARRAY_BARS - 1];

        for (let i = 0; i < animations.length; i++) {
            const [state, aIndex, bIndex] = animations[i];

            const aStyle = arrayBars[aIndex].style;
            const bStyle = arrayBars[bIndex].style;
            const aStylePrev = arrayBars[aIndexPrev].style;
            const bStylePrev = arrayBars[bIndexPrev].style;

            if (state === -2) { // Highlighting hi and lo of current partition. 
                if (DEBUG) console.log("lo: " + aIndex + " hi: " + bIndex);
                this.updateColors(aStyle, bStyle, CURRENT_COMPARISON, CURRENT_COMPARISON, aStylePrev, bStylePrev, i);

            } else if (state === -1) { // Highlighting pivot index.
                if (DEBUG) console.log("pivot: " + aIndex);
                this.updateColors(aStyle, bStyle, SINGLE_SELECTION, SINGLE_SELECTION, aStylePrev, bStylePrev, i);

            } else if (state === 0) { // Comparing current bar with pivot.
                if (DEBUG) console.log("comparison: [" + aIndex + ", " + bIndex + "]");
                this.updateColors(aStyle, bStyle, LOWER_NUM_COLOR, HIGHER_NUM_COLOR, aStylePrev, bStylePrev, i);

            } else if (state === 1) { // Swapping current selection with swap index if less than pivot
                if (DEBUG) console.log("swapping: [" + aIndex + ", " + bIndex + "]");
                this.updateColors(aStyle, bStyle, HIGHER_NUM_COLOR, LOWER_NUM_COLOR, aStylePrev, bStylePrev, i);
                this.swapBars(aStyle, bStyle, i);

            } else { // Swapping pivot bar with swap index. 
                if (DEBUG) console.log("swap pivot: [" + aIndex + ", " + bIndex + "]");
                this.updateColors(aStyle, bStyle, PRIMARY_COLOR, PRIMARY_COLOR, aStylePrev, bStylePrev, i);
                this.swapBars(aStyle, bStyle, i);

            }
            aIndexPrev = aIndex;
            bIndexPrev = bIndex;
        }

        this.disableButtons(animations.length);
        this.updateArrayState(sortedArray, animations.length);
        this.resetColors(arrayBars, animations.length);
    }

    // Resets the bars used in the previous animation to the primary color and updates the colors of bars A and B. 
    updateColors(aStyle, bStyle, aColor, bColor, aStylePrev, bStylePrev, i) {
        setTimeout(() => {
            aStylePrev.backgroundColor = PRIMARY_COLOR;
            bStylePrev.backgroundColor = PRIMARY_COLOR;
            aStyle.backgroundColor = aColor;
            bStyle.backgroundColor = bColor;
        }, i * ANIMATION_SPEED_MS);
    }

    // Swaps the heights of bars A and B.
    swapBars(aStyle, bStyle, i) {
        setTimeout(() => {
            let temp = aStyle.height;
            aStyle.height = bStyle.height;
            bStyle.height = temp;
        }, i * ANIMATION_SPEED_MS);
    }

    // Resets the colors of all array bars to the primary color.
    resetColors(arrayBars, animationsLength) {
        setTimeout(() => {
            for (let i = 0; i < NUM_ARRAY_BARS; i++) {
                arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
            }
        }, animationsLength * ANIMATION_SPEED_MS);
    }

    // Temporarily disables buttons until sorting is complete.
    disableButtons(numAnimations) {
        const buttons = document.getElementsByTagName('button');

        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            button.disabled = true;
        }

        setTimeout(() => {
            for (let i = 0; i < buttons.length; i++) {
                const button = buttons[i];
                button.disabled = false;
            }
        }, numAnimations * ANIMATION_SPEED_MS);
    }

    // Updates the state once all animations have finished.
    updateArrayState(sortedArray, numAnimations) {
        setTimeout(() => {
            this.setState({ array: sortedArray });
        }, numAnimations * ANIMATION_SPEED_MS);
    }

    // Tests the validity of all sorting algorithms.
    testAlgorithms() {
        /* Creates 100 random arrays of size 1 - 1000 with values ranging from -1000 - 1000, 
        sorts them using my sorting implementations and JavaScript's built-in sort, and 
        compares the two resulting arrays.
        */
        const testArrays = [];
        for (let i = 0; i < 100; i++) {
            let array = [];
            const len = randomIntFromInterval(1, 1000);
            for (let j = 0; j < len; j++) {
                array.push(randomIntFromInterval(-1000, 1000));
            }
            testArrays[i] = array;
        }

        let testResults = [0, 0, 0, 0, 0];

        for (let i = 0; i < 100; i++) {
            const javaScriptSort = testArrays[i].slice().sort((a, b) => a - b);
            const bubbleSortArray = SortingAlgorithms.bubbleSort(testArrays[i].slice())[1];
            const insertionSortArray = SortingAlgorithms.insertionSort(testArrays[i].slice())[1];
            const selectionSortArray = SortingAlgorithms.selectionSort(testArrays[i].slice())[1];
            const mergeSortArray = SortingAlgorithms.mergeSort(testArrays[i].slice())[1];
            const quickSortArray = SortingAlgorithms.quickSort(testArrays[i].slice())[1];

            if (this.arraysAreEqual(javaScriptSort, bubbleSortArray)) {
                testResults[0]++;
            }

            if (this.arraysAreEqual(javaScriptSort, insertionSortArray)) {
                testResults[1]++;
            }

            if (this.arraysAreEqual(javaScriptSort, selectionSortArray)) {
                testResults[2]++;
            }

            if (this.arraysAreEqual(javaScriptSort, mergeSortArray)) {
                testResults[3]++;
            }

            if (this.arraysAreEqual(javaScriptSort, quickSortArray)) {
                testResults[4]++;
            }
        }

        console.log("Bubble Sort: " + testResults[0] + " correct");
        console.log("Insertion Sort: " + testResults[1] + " correct");
        console.log("Selection Sort: " + testResults[2] + " correct");
        console.log("Merge Sort: " + testResults[3] + " correct");
        console.log("Quick Sort: " + testResults[4] + " correct");
    }

    // Determines whether two arrays are equal, taking order into account.
    arraysAreEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;

        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    render() {
        const { array } = this.state;

        return (
            <div>
                <header>
                    <div id="title">sorting visualizer</div>
                </header>
                <div>
                    <button className="center-button" onClick={() => this.resetArray()}>generate new array</button>
                    <button className="center-button" onClick={() => this.testAlgorithms()}>test algorithms</button>
                </div>
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{ height: `${value}vh` }}
                        ></div>
                    ))}
                </div>
                <div>
                    <button className="bottom-button" onClick={() => this.bubbleSort()}>bubble</button>
                    <button className="bottom-button" onClick={() => this.insertionSort()}>insertion</button>
                    <button className="bottom-button" onClick={() => this.selectionSort()}>selection</button>
                    <button className="bottom-button" onClick={() => this.mergeSort()}>merge</button>
                    <button className="bottom-button" onClick={() => this.quickSort()}>quick</button>
                    {/* <button className="bottom-button" id="sort-button" onClick={() => alert("Not implemented yet!")}>sort!</button> */}
                </div>
            </div>
        );
    }
}

// Generates a random integer from the given interval (inclusive min/max).
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}