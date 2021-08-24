import styles from "./Game.module.css";
import { useCallback, useState } from "react";
import { cardValues, CardValue } from "../card-values";
import Board from "./Board";

function getRandomInitialValues(): CardValue[] {
  console.log("Get random initial values");
  return cardValues
    .concat(cardValues)
    .sort(() => (Math.random() > 0.5 ? 1 : -1));
}

export default function Game() {
  const [movementsMade, setMovementsMade] = useState<number>(0);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<CardValue[]>(
    getRandomInitialValues()
  );

  const makeMovementHandler = useCallback(() => {
    setMovementsMade((previous) => previous + 1);
  }, []);

  const finishedHandler = useCallback(() => {
    setGameFinished(true);
  }, []);

  const clickRestartButtonHandler = useCallback(() => {
    console.log("restart game");
    setInitialValues(getRandomInitialValues());
    setMovementsMade(0);
    setGameFinished(false);
  }, []);

  if (gameFinished) {
    return <div>Game Finished!!!!</div>;
  }

  console.log("render Game");

  return (
    <div className={styles.game}>
      <div className={styles["game-controls"]}>
        <div className={styles["movements-counter"]}>Movements: {movementsMade}</div>
        <div className={styles["restart-game"]}>
          <button
            className={styles["restart-game__button"]}
            onClick={clickRestartButtonHandler}
          >
            Reset
          </button>
        </div>
      </div>
      <Board
        initialValues={initialValues}
        onMakeMovement={makeMovementHandler}
        onFinished={finishedHandler}
      />
    </div>
  );
}
