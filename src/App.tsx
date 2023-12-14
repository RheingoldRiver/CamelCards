import Game from "./components/Game/Game";
import GameStateProvider from "./components/GameStateProvider/GameStateProvider";
import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Header />
      <GameStateProvider>
        <Game></Game>
      </GameStateProvider>
    </>
  );
}

export default App;
