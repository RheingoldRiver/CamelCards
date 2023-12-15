import { DndProvider } from "react-dnd";
import Game from "./components/Game/Game";
import GameStateProvider from "./components/GameStateProvider/GameStateProvider";
import Header from "./components/Header/Header";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Header />
        <GameStateProvider>
          <Game></Game>
        </GameStateProvider>
      </DndProvider>
    </>
  );
}

export default App;
