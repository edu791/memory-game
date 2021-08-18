import { useCallback, useState } from 'react';
import { InitialValue } from '../initial-values';
import Board from './Board';

export default function Game(props: { initialValues: InitialValue[] }) {
  const [movementsMade, setMovementsMade] = useState<number>(0);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  const makeMovementHandler = useCallback(() => {
    setMovementsMade((previous) => previous + 1);
  }, []);

  const finishedHandler = useCallback(() => {
    setGameFinished(true);
  }, []);

  if (gameFinished) {
    return <div>Game Finished!!!!</div>
  }

  return <div>
    <div>Movements: {movementsMade}</div>
    <Board initialValues={props.initialValues} onMakeMovement={makeMovementHandler} onFinished={finishedHandler} />
  </div>;
}
