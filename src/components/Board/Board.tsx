import { useContext, type FC } from "react";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import HandDisplay from "../Hand";
import clsx from "clsx";

interface Props {}

const Board: FC<Props> = () => {
  const { hands } = useContext(GameStateContext);
  return (
    <div className={clsx("grid grid-cols-5 gap-2 justify-items-center")}>
      {hands.map((hand, i) => (
        <HandDisplay hand={hand} key={hand.key} index={i}></HandDisplay>
      ))}
    </div>
  );
};

export default Board;
