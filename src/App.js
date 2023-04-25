import { useEffect, useState } from "react";
import Confetti from "react-confetti";

import "./App.css";

function App() {
  const createArrOfObj = () => {
    let dicesArray = [];
    for (let i = 0; i < 10; i++) {
      dicesArray.push({
        id: i + 1,
        number: Math.ceil(Math.random() * 6),
        isLocked: false,
      });
    }
    return dicesArray;
  };

  const [dices, setDices] = useState(createArrOfObj());
  const [isWin, setIsWin] = useState(false);

  const onClickLockDice = (diceId) => {
    setDices((prevDice) => {
      return prevDice.map((dice) => {
        if (dice.id === diceId) {
          return {
            ...dice,
            isLocked: !dice.isLocked,
          };
        } else {
          return dice;
        }
      });
    });
  };

  const onCLickRoll = () => {
    setDices((prevDice) => {
      return prevDice.map((dice) => {
        if (dice.isLocked) {
          return dice;
        } else {
          return {
            ...dice,
            number: Math.ceil(Math.random() * 6),
          };
        }
      });
    });
  };

  useEffect(() => {
    const lockedDice = dices.every((dice) => {
      return dice.isLocked === true;
    });

    const allNumbersSame = dices.every((dice) => {
      return dice.number === dices[0].number;
    });

    if (allNumbersSame && lockedDice) {
      setIsWin(true);
      console.log("you won");
    }
  }, [dices]);

  const startNewGame = () => {
    setIsWin(false);
    setDices(createArrOfObj());
  };

  return (
    <div className="App">
      {isWin && <Confetti />}
      <div className="container">
        <h1>Tenzies</h1>
        <p>
          Roll until all dices are the same. Click each dice to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-buttons">
          {dices.map((dice) => (
            <button
              key={dice.id}
              className={dice.isLocked ? "dice-button-locked" : "dice-button"}
              onClick={() => onClickLockDice(dice.id)}
            >
              {dice.number}
            </button>
          ))}
        </div>
        <button
          className="roll-button"
          onClick={isWin ? startNewGame : onCLickRoll}
        >
          {isWin ? "New Game" : "Roll"}
        </button>
      </div>
    </div>
  );
}

export default App;
