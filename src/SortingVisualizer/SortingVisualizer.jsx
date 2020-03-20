import React from 'react';
import './SortingVisualizer.css';
import * as SelectionSort from '../SortingAlgorithms/SelectionSort.js'

const DEBUG = false;

const ANIMATION_SPEED_MS = 100;
const NUM_ARRAY_BARS = 15;
const PRIMARY_COLOR = '#484f8f';

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

        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < NUM_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 65));
        }

        this.setState({ array });
    }

    selectionSort() {
        // Temporarily disables buttons until sorting is complete.
        const buttons = document.getElementsByTagName('button');

        for (let i = 0; i < buttons.length; i++) {
            const button = buttons[i];
            button.disabled = true;
        }

        const animations = SelectionSort.sortingAnimations(this.state.array);
        const length = this.state.array.length;

        if (DEBUG) console.log(animations);

        // Variables used to track the swapped array indices.
        let animationSwapIndex = length - 1;
        let count = 1;
        let [aIndexPrev, bIndexPrev] = [length - 1, length - 1];

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');

            const [aIndex, bIndex] = animations[i];

            const aStyle = arrayBars[aIndex].style;
            const bStyle = arrayBars[bIndex].style;

            const aStylePrev = arrayBars[aIndexPrev].style;
            const bStylePrev = arrayBars[bIndexPrev].style;

            if (i === animationSwapIndex) {
                if (DEBUG) console.log("Swap: " + animations[i]);
                animationSwapIndex += length - count++;

                setTimeout(() => {
                    let temp = aStyle.height;
                    aStyle.height = bStyle.height;
                    bStyle.height = temp;
                    aStylePrev.backgroundColor = PRIMARY_COLOR;
                    bStylePrev.backgroundColor = PRIMARY_COLOR;
                    // bStyle.backgroundColor = 'red';
                    // aStyle.backgroundColor = 'blue';
                }, i * ANIMATION_SPEED_MS);

            } else {
                if (DEBUG) console.log("Compare: " + animations[i]);

                setTimeout(() => {
                    aStylePrev.backgroundColor = PRIMARY_COLOR;
                    bStylePrev.backgroundColor = PRIMARY_COLOR;
                    aStyle.backgroundColor = 'green';
                    bStyle.backgroundColor = 'blue';

                }, i * ANIMATION_SPEED_MS);

            }
            aIndexPrev = aIndex;
            bIndexPrev = bIndex;
        }

        setTimeout(() => {
            for (let i = 0; i < buttons.length; i++) {
                const button = buttons[i];
                button.disabled = false;
            }
        }, animations.length * ANIMATION_SPEED_MS);

    }

    // Tests the validity of all sorting algorithms.
    testAlgorithms() {
        /* Creates 100 random arrays of size 1 - 1000 with values ranging from -1000 - 1000, 
        sorts them using my sorting implementations and JavaScript's built-in sort, and 
        compares the two resulting arrays.
        */
        for (let i = 0; i < 100; i++) {
            const array = [];
            const len = randomIntFromInterval(1, 1000);
            for (let j = 0; j < len; j++) {
                array.push(randomIntFromInterval(-1000, 1000));
            }
            const javaScriptSort = array.slice().sort((a, b) => a - b);
            const selectionSortArray = SelectionSort.sort(array.slice());
            console.log("Selection Sort: " + this.arraysAreEqual(javaScriptSort, selectionSortArray));
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
                    <button className="bottom-button" onClick={() => this.selectionSort()}>bubble</button>
                    <button className="bottom-button" onClick={() => this.selectionSort()}>insertion</button>
                    <button className="bottom-button" onClick={() => this.selectionSort(this)}>selection</button>
                    <button className="bottom-button" onClick={() => this.selectionSort()}>heap</button>
                    <button className="bottom-button" onClick={() => this.selectionSort()}>quick</button>
                    <button className="bottom-button" id="sort-button" onClick={() => this.selectionSort()}>sort!</button>

                    {/* <button onClick={() => this.testAlgorithms()}>Test Algorithms</button> */}
                </div>
            </div>
        );
    }
}

// Generates a random integer from the given interval (inclusive min/max).
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}