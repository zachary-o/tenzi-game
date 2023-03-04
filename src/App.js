
import { useState } from 'react';

import './App.css';

function App() {

const [number, setNumber] = useState(1)

const diceButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];


const getRandomNum = (min, max) => {
  let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
;
  setNumber(randomNum);
  console.log(number);
}

  return (
    <div className="App">
      <div className="container">
        <h1>Tenzies</h1>
        <p>
          Roll until all dices are the same. Click each dice to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-buttons">
          {diceButtons.map((diceButton, index) => {
            return (
              <button key={index} className="dice-button">
                {number}
              </button>
            );
          })}
        </div>
        <button className="roll-button" onClick={() => getRandomNum(1, 6)}>
          Roll
        </button>
        <button className="change-mode-button">Change Mode</button>
      </div>
    </div>
  );
}

export default App;
