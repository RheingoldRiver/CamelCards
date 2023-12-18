import { useContext, type FC } from "react";
import * as Toolbar from "@radix-ui/react-toolbar";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import { actualScore } from "../../gameHelpers";
import clsx from "clsx";

interface Props {}

const GameActions: FC<Props> = () => {
  const { scores, setScores, newHands, setShowCards, hands, useJokers, allowCheat } = useContext(GameStateContext);
  return (
    <Toolbar.Root className="my-2" aria-label="Formatting options">
      <span className={clsx("bg-sand-400 p-2 rounded-xl", "mx-2", "h-10")}>
        Total score: {scores.reduce((acc, s) => acc + s, 0)}
      </span>
      <span className={clsx("bg-sand-400 p-2 rounded-xl", "mx-2", "h-10")}>
        Current score: {actualScore(hands, useJokers, allowCheat)}
      </span>
      <Toolbar.Separator className="inline" />
      <Toolbar.Button
        className={clsx(
          "bg-sand-400 p-2 rounded-xl",
          "hover:bg-sand-800 hover:text-white hover:shadow-lg hover shadow-sand-800",
          "mx-2",
          "h-10"
        )}
        style={{ marginLeft: "auto" }}
        onClick={() => {
          setShowCards(true);
          setScores([...scores, actualScore(hands, useJokers, allowCheat)]);
          newHands();
        }}
      >
        Play game with these bids!
      </Toolbar.Button>
    </Toolbar.Root>
  );
};

export default GameActions;
