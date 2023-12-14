import BidHistory from "../BidHistory";
import Board from "../Board";
import GameActions from "../GameActions";
import PreferencesToolbar from "../PreferencesToolbar/PreferencesToolbar";

function Game() {
  return (
    <div className="grid grid-areas-game">
      <div className="grid-area-bids">
        <BidHistory />
      </div>
      <div className="grid-area-board">
        <Board></Board>
        <GameActions></GameActions>
      </div>
      <div className="grid-area-prefs">
        <PreferencesToolbar />
      </div>
    </div>
  );
}

export default Game;
