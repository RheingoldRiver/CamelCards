import Board from "../Board";
import GameActions from "../GameActions";
import { GameOverModal } from "../GameOverModal/GameOverModal";
import PreferencesToolbar from "../PreferencesToolbar/PreferencesToolbar";

function Game() {
  return (
    <div className="grid grid-areas-game w-full h-full">
      <div className="grid-in-board">
        <GameOverModal />
        <GameActions></GameActions>
        <Board></Board>
      </div>
      <div className="grid-in-prefs mt-2">
        <PreferencesToolbar />
      </div>
    </div>
  );
}

export default Game;
