import { useContext, type FC } from "react";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import clsx from "clsx";
import { useDrag, useDrop } from "react-dnd";
import { Bid } from "../../constants";

interface Props {}

const BID_DRAG_TYPE = "__bid";

const BidHistory: FC<Props> = () => {
  const { hands } = useContext(GameStateContext);
  return (
    <div className={clsx("flex flex-col max-w-[8em] gap-2")}>
      {hands.map(({ bid }, i) => (
        <BidItem bid={bid.bid} key={bid.key} index={i}></BidItem>
      ))}
    </div>
  );
};

const BidItem = ({ bid, index }: { bid: number; index: number }) => {
  const { hands, swapBids } = useContext(GameStateContext);
  const [, dragRef] = useDrag(() => ({
    type: BID_DRAG_TYPE,
    item: { i: index },
  }));

  const [{ isHovered }, dropRef] = useDrop(
    () => ({
      accept: BID_DRAG_TYPE,
      drop: ({ i }: { bid: Bid; i: number }) => {
        swapBids(i, index);
      },
      collect: (monitor) => ({
        isHovered: !!monitor.isOver(),
      }),
    }),
    [hands]
  );

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      className={clsx("cursor-grab p2 bg-yellow-300 p-3 rounded-md", isHovered ? "bg-yellow-300" : "")}
    >
      {bid} {index}
    </div>
  );
};

export default BidHistory;
