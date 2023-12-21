import { useContext, useState } from "react";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import clsx from "clsx";
import { useDrag, useDrop } from "react-dnd";
import { Card, Hand } from "../../constants";
import { range, shuffle } from "lodash";

const BID_DRAG_TYPE = "__bid";

const HandDisplay = ({ hand, index }: { hand: Hand; index: number }) => {
  const { hands, swapBids, showCards, numRevealedCards, numCardsPerHand } = useContext(GameStateContext);
  const [fadeAnimation, setFadeAnimation] = useState<boolean>(false);
  const [cardRevealOrder, setCardRevealOrder] = useState<number[]>(() => shuffle(range(numCardsPerHand)));
  function enableFade() {
    setFadeAnimation(true);
    setTimeout(() => {
      setFadeAnimation(false);
    }, 2000);
  }
  const [{ isSource }, dragRef] = useDrag(() => ({
    type: BID_DRAG_TYPE,
    item: { i: index },
    collect: (monitor) => {
      return {
        isSource: !!monitor.isDragging(),
      };
    },
    end: (_item, monitor) => {
      if (monitor.didDrop()) {
        enableFade();
      }
    },
  }));

  const [{ isHovered }, dropRef] = useDrop(
    () => ({
      accept: BID_DRAG_TYPE,
      drop: ({ i }: { i: number }) => {
        enableFade();
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
      style={{
        transform: isHovered ? "scale(1.1)" : "",
        transition: "transform 250ms",
      }}
    >
      <span className={clsx("grid-in-index flex flex-row justify-end align-start")}>{index + 1}</span>
      <div className={clsx("flex flex-row")}>
        {hand.cards.map((card, i) => (
          <CardDisplay key={`${hand.key}_${i}`} card={card} show={cardRevealOrder.slice(0, numRevealedCards).includes(i)} />
        ))}
      </div>
      <div
        className={clsx(
          isHovered ? "bg-green-500" : isSource ? "bg-yellow-500" : "bg-sand-100",
          "w-[16em]",
          "w-[fit-content] rounded-xl px-1"
        )}
        style={{
          transform: isHovered ? "scale(1.1)" : "",
          transition: fadeAnimation ? "background 2000ms, transform 500ms" : "transform 250ms",
        }}
      >
        Bid: {hand.bid.bid}
      </div>
    </div>
  );
};

const CardDisplay = ({ card, show }: { card: Card, show: boolean }) => {
  const { showCards } = useContext(GameStateContext);
  return <div className={clsx("")}>{showCards || show ? card.display : "?"}</div>;
};

export default HandDisplay;
