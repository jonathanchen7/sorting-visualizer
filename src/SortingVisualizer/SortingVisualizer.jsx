import React from 'react';
import './SortingVisualizer.css';
import * as SortingAlgorithms from '../SortingAlgorithms/SortingAlgorithms.js'

const DEBUG = false;

const SORTED_MS = 1500;

// Colors used in the sorting visualizer.
const PRIMARY_COLOR = '#484f8f';
const SELECTION_COLOR = '#a6c64c';
const HIGHER_NUM_COLOR = '#c80003';
const LOWER_NUM_COLOR = '#405d3a';
const SORTED_COLOR = '#488f4b';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            animationSpeed: 50,
            numBars: 50,
        };
    }

    // Runs when the component is initially loaded.
    componentDidMount() {
        this.resetArray(this.state.numBars);
    }

    // Generates a random int array of length numBars.
    resetArray(value) {
        const array = [];

        for (let i = 0; i < value; i++) {
            array.push(this.randomIntFromInterval(5, 65));
        }

        this.setState({ array });
    }

    // Handles animations for Bubble Sort.
    bubbleSort() {
        const results = SortingAlgorithms.bubbleSort(this.state.array.slice());
        const animations = results[0];
        const sortedArray = results[1];

        const arrayBars = document.getElementsByClassName('array-bar');

        let [aIndexPrev, bIndexPrev] = [this.state.numBars - 1, this.state.numBars - 1];

        for (let i = 0; i < animations.length; i++) {
            const [swap, aIndex, bIndex] = animations[i];

            const aStyle = arrayBars[aIndex].style;
            const bStyle = arrayBars[bIndex].style;
            const aStylePrev = arrayBars[aIndexPrev].style;
            const bStylePrev = arrayBars[bIndexPrev].style;

            if (swap === -1) { // Highlights currently selected bars.
                this.updateColors(aStyle, bStyle, SELECTION_COLOR, SELECTION_COLOR, aStylePrev, bStylePrev, i);
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

        let [aIndexPrev, bIndexPrev] = [this.state.numBars - 1, this.state.numBars - 1];

        for (let i = 0; i < animations.length; i++) {
            const [swap, aIndex, bIndex] = animations[i];

            const aStyle = arrayBars[aIndex].style;
            const bStyle = arrayBars[bIndex].style;
            const aStylePrev = arrayBars[aIndexPrev].style;
            const bStylePrev = arrayBars[bIndexPrev].style;

            if (swap === -1) { // Highlights currently selected bar.
                this.updateColors(aStyle, bStyle, SELECTION_COLOR, SELECTION_COLOR, aStylePrev, bStylePrev, i);
            } else if (swap === 0) { // Comparing two bars.
                this.updateColors(aStyle, bStyle, LOWER_NUM_COLOR, HIGHER_NUM_COLOR, aStylePrev, bStylePrev, i);
            } else { // Swaps positions of two bars. 
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
        let [aIndexPrev, bIndexPrev] = [this.state.numBars - 1, this.state.numBars - 1];

        for (let i = 0; i < animations.length; i++) {
            const [swap, aIndex, bIndex] = animations[i];

            const aStyle = arrayBars[aIndex].style;
            const bStyle = arrayBars[bIndex].style;
            const aStylePrev = arrayBars[aIndexPrev].style;
            const bStylePrev = arrayBars[bIndexPrev].style;

            if (!swap) { // Comparing two bars.
                if (DEBUG) console.log("Compare: " + animations[i]);
                this.updateColors(aStyle, bStyle, LOWER_NUM_COLOR, HIGHER_NUM_COLOR, aStylePrev, bStylePrev, i);
            } else { // Swaps positions of two bars.
                if (DEBUG) console.log("Swap: " + animations[i]);
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

    // Handles animations for Merge Sort.
    mergeSort() {
        const results = SortingAlgorithms.mergeSort(this.state.array.slice());
        const animations = results[0];
        const sortedArray = results[1];

        const arrayBars = document.getElementsByClassName('array-bar');

        let [aIndexPrev, bIndexPrev] = [this.state.numBars - 1, this.state.numBars - 1];

        for (let i = 0; i < animations.length; i++) {
            const [state, aIndex, bIndex] = animations[i];

            const aStyle = arrayBars[aIndex].style;
            const bStyle = arrayBars[bIndex].style;
            const aStylePrev = arrayBars[aIndexPrev].style;
            const bStylePrev = arrayBars[bIndexPrev].style;

            if (state === -1) { // Highlighting hi and lo.
                this.updateColors(aStyle, bStyle, SELECTION_COLOR, SELECTION_COLOR, aStylePrev, bStylePrev, i);
            } else if (state === 0) { // Comparing two bars from partitions.
                this.updateColors(aStyle, bStyle, LOWER_NUM_COLOR, HIGHER_NUM_COLOR, aStylePrev, bStylePrev, i);
            } else { // Updating bar at swapIndex with new height (can't fully visualize because of aux array).
                this.updateColors(aStyle, bStyle, HIGHER_NUM_COLOR, LOWER_NUM_COLOR, aStylePrev, bStylePrev, i);
                let newHeight = animations[i][3];

                setTimeout(() => {
                    aStyle.height = `${newHeight}vh`;
                }, i * this.state.animationSpeed);
            }
            aIndexPrev = aIndex;
            bIndexPrev = bIndex;
        }

        this.disableButtons(animations.length);
        this.updateArrayState(sortedArray, animations.length);
        this.resetColors(arrayBars, animations.length);
    }

    // Handles animations for Quick Sort.
    quickSort() {
        const results = SortingAlgorithms.quickSort(this.state.array.slice());
        const animations = results[0];
        const sortedArray = results[1];

        const arrayBars = document.getElementsByClassName('array-bar');

        let [aIndexPrev, bIndexPrev] = [this.state.numBars - 1, this.state.numBars - 1];

        for (let i = 0; i < animations.length; i++) {
            const [state, aIndex, bIndex] = animations[i];

            const aStyle = arrayBars[aIndex].style;
            const bStyle = arrayBars[bIndex].style;
            const aStylePrev = arrayBars[aIndexPrev].style;
            const bStylePrev = arrayBars[bIndexPrev].style;

            if (state === -2) { // Highlighting hi and lo of current partition. 
                if (DEBUG) console.log("lo: " + aIndex + " hi: " + bIndex);
                this.updateColors(aStyle, bStyle, SELECTION_COLOR, SELECTION_COLOR, aStylePrev, bStylePrev, i);

            } else if (state === -1) { // Highlighting pivot index.
                if (DEBUG) console.log("pivot: " + aIndex);
                this.updateColors(aStyle, bStyle, SELECTION_COLOR, SELECTION_COLOR, aStylePrev, bStylePrev, i);

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
        }, i * this.state.animationSpeed);
    }

    // Swaps the heights of bars A and B.
    swapBars(aStyle, bStyle, i) {
        setTimeout(() => {
            let temp = aStyle.height;
            aStyle.height = bStyle.height;
            bStyle.height = temp;
        }, i * this.state.animationSpeed);
    }

    // Resets the colors of all array bars to the primary color.
    resetColors(arrayBars, numAnimations) {
        setTimeout(() => {
            for (let i = 0; i < this.state.numBars; i++) {
                arrayBars[i].style.backgroundColor = SORTED_COLOR;
            }
        }, numAnimations * this.state.animationSpeed);

        setTimeout(() => {
            for (let i = 0; i < this.state.numBars; i++) {
                arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
            }
        }, (numAnimations * this.state.animationSpeed) + SORTED_MS);
    }

    // Temporarily disables buttons until sorting is complete.
    disableButtons(numAnimations) {
        const buttons = document.getElementsByTagName('button');

        for (let i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }

        // Enables buttons after all animations have finished.
        setTimeout(() => {
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].disabled = false;
            }
        }, (numAnimations * this.state.animationSpeed) + SORTED_MS);
    }

    // Updates the state once all animations have finished.
    updateArrayState(sortedArray, numAnimations) {
        setTimeout(() => {
            this.setState({ array: sortedArray });
        }, numAnimations * this.state.animationSpeed);
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
            const len = this.randomIntFromInterval(1, 1000);
            for (let j = 0; j < len; j++) {
                array.push(this.randomIntFromInterval(-1000, 1000));
            }
            testArrays[i] = array;
        }

        let testResults = [0, 0, 0, 0, 0];

        for (let i = 0; i < 100; i++) { // Tests sorts on 100 unique arrays.
            const javaScriptSort = testArrays[i].slice().sort((a, b) => a - b);
            const bubbleSortArray = SortingAlgorithms.bubbleSort(testArrays[i].slice())[1];
            const insertionSortArray = SortingAlgorithms.insertionSort(testArrays[i].slice())[1];
            const selectionSortArray = SortingAlgorithms.selectionSort(testArrays[i].slice())[1];
            const mergeSortArray = SortingAlgorithms.mergeSort(testArrays[i].slice())[1];
            const quickSortArray = SortingAlgorithms.quickSort(testArrays[i].slice())[1];

            // Increments corresponding value in testResults if implemented sort matches JavaScript's sort.
            if (this.arraysAreEqual(javaScriptSort, bubbleSortArray)) testResults[0]++;
            if (this.arraysAreEqual(javaScriptSort, insertionSortArray)) testResults[1]++;
            if (this.arraysAreEqual(javaScriptSort, selectionSortArray)) testResults[2]++;
            if (this.arraysAreEqual(javaScriptSort, mergeSortArray)) testResults[3]++;
            if (this.arraysAreEqual(javaScriptSort, quickSortArray)) testResults[4]++;
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

    // Generates a random integer from the given interval (inclusive min/max).
    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    updateAnimationSpeed = (e) => {
        let value = parseInt(e.target.value);
        let newValue;

        if (value === 10) newValue = 1000;
        else if (value === 20) newValue = 500;
        else if (value === 30) newValue = 100;
        else if (value === 40) newValue = 50;
        else newValue = 10;

        this.setState({ animationSpeed: newValue });
    }

    updateNumBars = (e) => {
        let value = parseInt(e.target.value);
        let newValue;

        if (value === 10) newValue = 10;
        else if (value === 20) newValue = 25;
        else if (value === 30) newValue = 50;
        else if (value === 40) newValue = 75;
        else newValue = 100;

        this.setState({ numBars: newValue });
        this.resetArray(newValue);
    }

    render() {
        const { array } = this.state;

        return (
            <div>
                <header>
                    <div id="title">sorting visualizer</div>
                </header>

                <div>
                    <button className="center-button" onClick={() => this.resetArray(this.state.numBars)}>generate new array</button>
                    <input type="range" id="volume" defaultValue="30" min="10" max="50"
                        step="10" onInput={this.updateAnimationSpeed} />
                    <input type="range" id="volume" defaultValue="30" min="10" max="50"
                        step="10" onInput={this.updateNumBars} />
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
                </div>
            </div>
        );
    }
}
