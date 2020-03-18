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

    // Runs when the component is initially loaded
    componentDidMount() {
        this.resetArray();
    }

    // Creates an int array of length 100 containing numbers between 5-100.
    resetArray() {
        const array = [];
        for (let i = 0; i < 225; i++) {
            array.push(randomIntFromInterval(5, 85));
        }
        this.setState({ array });
    }

    selectionSort() {
        const javaScriptSort = this.state.array
            .slice()
            .sort((a, b) => a - b);
        const mySelectionSort = sortingAlgorithms.selectionSort(this.state.array);
        console.log(javaScriptSort);
        console.log(mySelectionSort);
        console.log(this.arraysAreEqual(javaScriptSort, mySelectionSort));
    }

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
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    // Inclusive min and max
    return Math.floor(Math.random() * (max - min + 1) + min);
}