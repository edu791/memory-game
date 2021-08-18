import Game from './components/Game';
import { initialValues } from "./initial-values";

export default function App() {
  return (
    <div>
      <Game initialValues={initialValues} />
    </div>
  );
}
