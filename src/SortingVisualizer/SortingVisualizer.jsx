import React from 'react';
import './SortingVisualizer.css';
import * as SortingAlgorithms from '../SortingAlgorithms/SortingAlgorithms.js'

const DEBUG = false;

const ANIMATION_SPEED_MS = 20;
const NUM_ARRAY_BARS = 15;

// Colors used in the sorting visualizer.
const PRIMARY_COLOR = '#484f8f';
const CURRENT_COMPARISON = '#484f8f';
const HIGHER_NUM_COLOR = 'red';
const LOWER_NUM_COLOR = 'green';
const SORTED_COLOR = '#90ee90';

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

        console.log(animations);

        this.disableButtons(animations.length);
        this.updateArrayState(sortedArray, animations.length);

        let [aIndexPrev, bIndexPrev] = [NUM_ARRAY_BARS - 1, NUM_ARRAY_BARS - 1];

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');

            const [swap, aIndex, bIndex] = animations[i];
            const aStyle = arrayBars[aIndex].style;
            const bStyle = arrayBars[bIndex].style;

            const aStylePrev = arrayBars[aIndexPrev].style;
            const bStylePrev = arrayBars[bIndexPrev].style;

            if (swap === -1) { // Selecting two bars.
                setTimeout(() => {
                    aStylePrev.backgroundColor = PRIMARY_COLOR;
                    bStylePrev.backgroundColor = PRIMARY_COLOR;
                    aStyle.backgroundColor = CURRENT_COMPARISON;
                    bStyle.backgroundColor = CURRENT_COMPARISON;
                }, i * ANIMATION_SPEED_MS);

            } else if (swap === 0) { // Comparing two bars.
                setTimeout(() => {
                    aStylePrev.backgroundColor = PRIMARY_COLOR;
                    bStylePrev.backgroundColor = PRIMARY_COLOR;
                    aStyle.backgroundColor = LOWER_NUM_COLOR;
                    bStyle.backgroundColor = HIGHER_NUM_COLOR;
                }, i * ANIMATION_SPEED_MS);
            } else { // Swapping positions of two bars.
                setTimeout(() => {
                    aStyle.backgroundColor = HIGHER_NUM_COLOR;
                    bStyle.backgroundColor = LOWER_NUM_COLOR;

                    let temp = aStyle.height;
                    aStyle.height = bStyle.height;
                    bStyle.height = temp;
                }, i * ANIMATION_SPEED_MS);
            }
            aIndexPrev = aIndex;
            bIndexPrev = bIndex;
        }

        const arrayBars = document.getElementsByClassName('array-bar');
        setTimeout(() => {
            for (let i = 0; i < arrayBars.length; i++) {
                arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
            }
        }, animations.length * ANIMATION_SPEED_MS);
    }

    // Handles animations for Insertion Sort.
    insertionSort() {
        const results = SortingAlgorithms.insertionSort(this.state.array.slice());
        const animations = results[0];
        const sortedArray = results[1];

        this.disableButtons(animations.length);
        this.updateArrayState(sortedArray, animations.length);

        let [aIndexPrev, bIndexPrev] = [NUM_ARRAY_BARS - 1, NUM_ARRAY_BARS - 1];

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');

            const [swap, aIndex, bIndex] = animations[i];
            const aStyle = arrayBars[aIndex].style;
            const bStyle = arrayBars[bIndex].style;

            const aStylePrev = arrayBars[aIndexPrev].style;
            const bStylePrev = arrayBars[bIndexPrev].style;

            if (swap === -1) {
                setTimeout(() => {
                    aStylePrev.backgroundColor = PRIMARY_COLOR;
                    bStylePrev.backgroundColor = PRIMARY_COLOR;
                    aStyle.backgroundColor = 'yellow';
                }, i * ANIMATION_SPEED_MS);
            } else if (swap === 0) {
                setTimeout(() => {
                    aStylePrev.backgroundColor = PRIMARY_COLOR;
                    bStylePrev.backgroundColor = PRIMARY_COLOR;
                    aStyle.backgroundColor = CURRENT_COMPARISON;
                    bStyle.backgroundColor = CURRENT_COMPARISON;
                }, i * ANIMATION_SPEED_MS);
            } else if (swap === 1) {
                setTimeout(() => {
                    aStylePrev.backgroundColor = PRIMARY_COLOR;
                    bStylePrev.backgroundColor = PRIMARY_COLOR;
                    aStyle.backgroundColor = LOWER_NUM_COLOR;
                    bStyle.backgroundColor = HIGHER_NUM_COLOR;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    aStyle.backgroundColor = HIGHER_NUM_COLOR;
                    bStyle.backgroundColor = LOWER_NUM_COLOR;

                    let temp = aStyle.height;
                    aStyle.height = bStyle.height;
                    bStyle.height = temp;
                }, i * ANIMATION_SPEED_MS);
            }

            aIndexPrev = aIndex;
            bIndexPrev = bIndex;
        }

        const arrayBars = document.getElementsByClassName('array-bar');
        setTimeout(() => {
            for (let i = 0; i < arrayBars.length; i++) {
                arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
            }
        }, animations.length * ANIMATION_SPEED_MS);

    }

    // Handles animations for Selection Sort.
    selectionSort() {
        const results = SortingAlgorithms.selectionSort(this.state.array.slice());

        const animations = results[0];
        const sortedArray = results[1];
        const length = sortedArray.length; // maybe replace with NUM_ARRAY_BARS?

        this.disableButtons(animations.length);
        this.updateArrayState(sortedArray, animations.length);

        if (DEBUG) console.log(animations);

        // Variables used to track the swapped array indices.
        let [aIndexPrev, bIndexPrev] = [length - 1, length - 1];

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');

            const [swap, aIndex, bIndex] = animations[i];

            const aStyle = arrayBars[aIndex].style;
            const bStyle = arrayBars[bIndex].style;

            const aStylePrev = arrayBars[aIndexPrev].style;
            const bStylePrev = arrayBars[bIndexPrev].style;

            if (swap) {
                if (DEBUG) console.log("Swap: " + animations[i]);

                setTimeout(() => {
                    aStylePrev.backgroundColor = PRIMARY_COLOR;
                    bStylePrev.backgroundColor = PRIMARY_COLOR;
                    let temp = aStyle.height;
                    aStyle.height = bStyle.height;
                    bStyle.height = temp;
                }, i * ANIMATION_SPEED_MS);

            } else {
                if (DEBUG) console.log("Compare: " + animations[i]);

                setTimeout(() => {
                    aStylePrev.backgroundColor = PRIMARY_COLOR;
                    bStylePrev.backgroundColor = PRIMARY_COLOR;

                    bStyle.backgroundColor = HIGHER_NUM_COLOR;
                    aStyle.backgroundColor = LOWER_NUM_COLOR;
                }, i * ANIMATION_SPEED_MS);

            }
            aIndexPrev = aIndex;
            bIndexPrev = bIndex;
        }


    }

    // Handles animations for Merge Sort.
    mergeSort() {

    }

    // Handles animations for Quick Sort.
    quickSort() {
        const results = SortingAlgorithms.quickSort(this.state.array.slice(), 0 , NUM_ARRAY_BARS - 1);
        const animations = results[0];
        const sortedArray = results[1];

        console.log(sortedArray);

        // this.disableButtons(animations.length);
        this.updateArrayState(sortedArray, animations.length);
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

        for (let i = 0; i < 100; i++) {
            const javaScriptSort = testArrays[i].slice().sort((a, b) => a - b);
            const selectionSortArray = SortingAlgorithms.selectionSort(testArrays[i].slice())[1];
            console.log("Selection Sort: " + this.arraysAreEqual(javaScriptSort, selectionSortArray));
        }

        for (let i = 0; i < 100; i++) {
            const javaScriptSort = testArrays[i].slice().sort((a, b) => a - b);
            const insertionSortArray = SortingAlgorithms.insertionSort(testArrays[i].slice())[1];
            console.log("Insertion Sort: " + this.arraysAreEqual(javaScriptSort, insertionSortArray));
        }

        for (let i = 0; i < 100; i++) {
            const javaScriptSort = testArrays[i].slice().sort((a, b) => a - b);
            const bubbleSortArray = SortingAlgorithms.bubbleSort(testArrays[i].slice())[1];
            console.log("Bubble Sort: " + this.arraysAreEqual(javaScriptSort, bubbleSortArray));
        }
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
                    {/* <button className="center-button" onClick={() => this.testAlgorithms()}>test algorithms</button> */}
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
                    <button className="bottom-button" id="sort-button" onClick={() => alert("Not implemented yet!")}>sort!</button>
                </div>
            </div>
        );
    }
}

// Generates a random integer from the given interval (inclusive min/max).
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}