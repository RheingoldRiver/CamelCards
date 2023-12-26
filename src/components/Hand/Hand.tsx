import { useContext, useState } from "react";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import clsx from "clsx";
import { useDrag, useDrop } from "react-dnd";
import { Card, Hand } from "../../constants";

const BID_DRAG_TYPE = "__bid";

const HandDisplay = ({ hand, index, rank }: { hand: Hand; index: number; rank: number }) => {
  const { hands, swapBids, showCards, numRevealedCards } = useContext(GameStateContext);
  const [fadeAnimation, setFadeAnimation] = useState<boolean>(false);
  function enableFade() {
    setFadeAnimation(true);
    setTimeout(() => {
      setFadeAnimation(false);
    }, 2000);
  }
  const [{ isSource }, dragRef, preview] = useDrag(() => ({
    item: { i: index },
    type: BID_DRAG_TYPE,
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
      <span
        className={clsx(
          "grid-in-index flex flex-row justify-end align-start",
          showCards ? "" : "text-goldStar [-webkit-text-stroke:1px_navy]"
        )}
      >
        {showCards ? rank : "★"}
      </span>
      <div className={clsx("flex flex-row gap-[.07rem]")}>
        {hand.cards.map((card, i) => (
          <CardDisplay
            key={`${hand.key}_${i}`}
            card={card}
            show={hand.cardRevealOrder.slice(0, numRevealedCards).includes(i)}
          />
        ))}
      </div>
      <div
        ref={preview}
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
        Bid: <span className="font-semibold">{hand.bid.bid}</span>
      </div>
    </div>
  );
};

const CardDisplay = ({ card, show }: { card: Card; show: boolean }) => {
  const { showCards } = useContext(GameStateContext);
  return <div className={clsx("text-lg")}>{showCards || show ? card.display : "?"}</div>;
};

export default HandDisplay;
