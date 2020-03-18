import React from 'react';
import './SortingVisualizer.css';

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
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    // Inclusive min and max
    return Math.floor(Math.random() * (max - min + 1) + min);
}