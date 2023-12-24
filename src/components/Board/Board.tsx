import { useContext, type FC } from "react";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import HandDisplay from "../Hand";
import clsx from "clsx";
import { getSortedKeys } from "../../gameHelpers";

interface Props {}

const Board: FC<Props> = () => {
  const { hands, useJokers, allowCheat } = useContext(GameStateContext);
  const sortedIds = getSortedKeys(hands, useJokers, allowCheat);
  return (
    <div className={clsx("flex flex-wrap gap-2 justify-start max-w-[1400px]")}>
      {hands.map((hand, i) => (
        <HandDisplay hand={hand} key={hand.key} index={i} rank={sortedIds.indexOf(hand.key) + 1}></HandDisplay>
      ))}
    </div>
  );
};

export default Board;
