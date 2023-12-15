import { useContext, type FC } from "react";
import * as Toolbar from "@radix-ui/react-toolbar";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import { actualScore } from "../../gameHelpers";

interface Props {}

const GameActions: FC<Props> = () => {
  const { scores, setScores, newHands, setShowCards, hands, useJokers, allowCheat } = useContext(GameStateContext);
  return (
    <Toolbar.Root className="ToolbarRoot" aria-label="Formatting options">
      <div>Total score: {scores.reduce((acc, s) => acc + s, 0)}</div>
      <div>Current score: {actualScore(hands, useJokers, allowCheat)}</div>
      <Toolbar.Separator className="inline" />
      <Toolbar.Button
        className="ToolbarButton"
        style={{ marginLeft: "auto" }}
        onClick={() => {
          setShowCards(true);
          setScores([...scores, actualScore(hands, useJokers, allowCheat)]);
          newHands();
        }}
      >
        Play game!
      </Toolbar.Button>
    </Toolbar.Root>
  );
};

export default GameActions;
