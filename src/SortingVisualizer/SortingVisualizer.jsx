import React from 'react';
import './SortingVisualizer.css';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms.js'

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
        for (let i = 0; i < 10; i++) {
            array.push(randomIntFromInterval(5, 85));
        }
        this.setState({ array });
    }

    selectionSort() {
        const animations = sortingAlgorithms.selectionSortAnimations(this.state.array);
        const length = this.state.array.length;

        // Variables used to track the swapped array indices.
        let swapIndex = length - 1;
        let count = 1;

        for (let i = 0; i < animations.length; i++) {
            let swap = false;
            if (i === swapIndex) {
                swapIndex += length - count++;

                



                console.log("Swap " + animations[i]);
            } else {







                console.log("Compare " + animations[i]);
            }

            const arrayBars = document.getElementsByClassName('array-bar');
        }

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
            const selectionSortArray = sortingAlgorithms.selectionSort(array.slice());
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
            <div className="array-container">
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{ height: `${value}vh` }}
                    ></div>
                ))}
                <br></br>
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.selectionSort()}>Selection Sort</button>
                <button onClick={() => this.testAlgorithms()}>Test Sorting Algorithms</button>
            </div>
        );
    }
}

// Generates a random integer from the given interval (inclusive min/max).
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}