import { useCallback, useEffect, useState } from "react";
import { cardValues } from "../card-values";
import { CardObject } from "../types";
import Board from "./Board";

function getRandomInitialValues(): CardObject[] {
  console.log("Get random initial values");
  return cardValues
    .concat(cardValues)
    .map((value) => ({
      ...value,
      id: Math.round(Math.random() * 1000000),
      isSelected: false,
      isMatched: false,
      matchResult: null,
    }))
    .sort(() => (Math.random() > 0.5 ? 1 : -1));
}

const initialValues = getRandomInitialValues();

export default function Game() {
  const [movementsMade, setMovementsMade] = useState<number>(0);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  // const [initialValues, setInitialValues] = useState<CardObject[]>([]);
  
  useEffect(() => {
    console.log('Component did mount');
    const randomInitialValues = getRandomInitialValues();
    console.log(randomInitialValues);
    // setInitialValues(randomInitialValues);
  }, []);

  const makeMovementHandler = useCallback(() => {
    setMovementsMade((previous) => previous + 1);
  }, []);

  const finishedHandler = useCallback(() => {
    setGameFinished(true);
  }, []);

  const clickRestartButtonHandler = useCallback(() => {
    console.log("restart game");
    // setInitialValues(getRandomInitialValues());
    setMovementsMade(0);
    setGameFinished(false);
  }, []);

  if (gameFinished) {
    return <div>Game Finished!!!!</div>;
  }

  return (
    <div>
      <div>Movements: {movementsMade}</div>
      <div>
        <button onClick={clickRestartButtonHandler}>Restart game</button>
      </div>
      <Board
        initialValues={initialValues}
        onMakeMovement={makeMovementHandler}
        onFinished={finishedHandler}
      />
    </div>
  );
}
