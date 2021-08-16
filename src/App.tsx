import Board from "./components/Board";
import { initialValues } from "./initial-values";

export default function App() {
  return (
    <div>
      <header></header>
      <Board initialValues={initialValues}></Board>
    </div>
  );
}
