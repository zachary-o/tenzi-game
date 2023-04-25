import { useEffect, useState, useRef } from "react";
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
  const [step, setStep] = useState(0);
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0 });
  const [interv, setInterv] = useState();

  useEffect(() => {
    setStep(step + 1);
  }, []);

  const startTimer = () => {
    run();
    setInterv(setInterval(run, 10));
  };

  let updatedMs = time.ms;
  let updatedS = time.s;
  let updatedM = time.m;

  const run = () => {
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM });
  };

  const stopTimer = () => {
    clearInterval(interv);
  };

  const resetTimer = () => {
    setTime({ ms: 0, s: 0, m: 0 });
  };

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

    if (time.ms === 0 && time.s === 0 && time.m === 0) {
      startTimer();
    }
    return;
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
    setStep(step + 1);
    console.log(step);

    if (time.ms === 0 && time.s === 0 && time.m === 0) {
      startTimer();
    }
    return;
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
      stopTimer();
    }
  }, [dices]);

  const startNewGame = () => {
    setIsWin(false);
    setDices(createArrOfObj());
    setStep(1);
    resetTimer();
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
        {isWin ? (
          <p>
            Your time is {time.m}:{time.s},{time.ms}. <br />
            It took you {step - 1} steps to win.
          </p>
        ) : (
          <div className="timer-container">
            <span>Time: </span>
            <p>
              {time.m >= 10 ? time.m : "0" + time.m} :{" "}
              {time.s >= 10 ? time.s : "0" + time.s} :{" "}
              {time.ms >= 10 ? time.ms : "0" + time.ms}
            </p>
          </div>
        )}
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
