import { useContext, type FC } from "react";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import clsx from "clsx";

interface Props {}

const BidHistory: FC<Props> = () => {
  const { hands } = useContext(GameStateContext);
  return (
    <div className={clsx("flex flex-col")}>
      {hands.map(({ bid, bidKey }, i) => (
        <Bid bid={bid} key={bidKey} index={i}></Bid>
      ))}
    </div>
  );
};

const Bid = ({ bid, index }: { bid: number; index: number }) => {
  return (
    <div className={clsx()}>
      {bid} {index}
    </div>
  );
};

export default BidHistory;
