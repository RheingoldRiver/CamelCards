import { useContext } from "react";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import clsx from "clsx";
import { useDrag, useDrop } from "react-dnd";
import { Card, Hand } from "../../constants";

const BID_DRAG_TYPE = "__bid";

const HandDisplay = ({ hand, index }: { hand: Hand; index: number }) => {
  const { hands, swapBids, showCards } = useContext(GameStateContext);
  const [{ isSource }, dragRef] = useDrag(() => ({
    type: BID_DRAG_TYPE,
    item: { i: index },
    collect: (monitor) => ({
      isSource: !!monitor.isDragging(),
    }),
  }));

  const [{ isHovered }, dropRef] = useDrop(
    () => ({
      accept: BID_DRAG_TYPE,
      drop: ({ i }: { i: number }) => {
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
      ref={showCards ? undefined : (node) => dragRef(dropRef(node))}
      className={clsx(
        showCards ? "" : "cursor-grab",
        "p2 p-3 rounded-md",
        isHovered ? "bg-green-300" : isSource ? "bg-yellow-300" : "bg-sand-100",
        "w-[16em]",
        "grid grid-areas-hand"
      )}
    >
      <span className={clsx("grid-in-index flex flex-row justify-end align-start")}>{index + 1}</span>
      <div className={clsx("flex flex-row")}>
        {hand.cards.map((card, i) => (
          <CardDisplay key={`${hand.key}_${i}`} card={card} />
        ))}
      </div>
      <div className={clsx()}>Bid: {hand.bid.bid}</div>
    </div>
  );
};

const CardDisplay = ({ card }: { card: Card }) => {
  const { showCards } = useContext(GameStateContext);
  return <div className={clsx("")}>{showCards ? card.display : "?"}</div>;
};

export default HandDisplay;
