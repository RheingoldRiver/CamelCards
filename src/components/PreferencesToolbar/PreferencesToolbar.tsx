import * as Toolbar from "@radix-ui/react-toolbar";
import * as Toggle from "@radix-ui/react-toggle";
import { useContext, useState } from "react";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import clsx from "clsx";
import { motion } from "framer-motion";
import { toNumber } from "lodash";
import { MAX_NUM_CARDS_PER_HAND, MAX_NUM_HANDS_PER_GAME } from "../../constants";

function PreferencesToolbar() {
  const {
    useJokers,
    toggleUseJokers,
    allowCheat,
    toggleAllowCheat,
    newHands,
    setShowCards,
    numRevealedCards,
    setNumRevealedCards,
    numCardsPerHand,
    setNumCardsPerHand,
    numHandsPerGame,
    setNumHandsPerGame,
    showCurrentScore,
    setShowCurrentScore,
  } = useContext(GameStateContext);
  const [curNumRevealedCards, setCurNumRevealedCards] = useState<number>(numRevealedCards);
  const [curNumCardsPerHand, setCurNumCardsPerHand] = useState<number>(numCardsPerHand);
  const [curNumHandsPerGame, setCurNumHandsPerGame] = useState<number>(numHandsPerGame);
  return (
    <Toolbar.Root className="flex flex-row flex-wrap justify-start items-center gap-y-2">
      <Toggle.Root
        className={clsx(
          "bg-sand-400 p-2 rounded-xl",
          "hover:bg-sand-800 hover:text-white hover:shadow-lg hover shadow-sand-800",
          "mx-2",
          "h-10",
          "inline-flex flex-row items-center"
        )}
        aria-label="Toggle jokers"
        pressed={useJokers}
        onPressedChange={toggleUseJokers}
        title="Use Jokers instead of Jacks"
      >
        <ToggleStatus status={useJokers} />
        Jokers
      </Toggle.Root>
      <Toggle.Root
        className={clsx(
          "bg-sand-400 p-2 rounded-xl whitespace-nowrap",
          "hover:bg-sand-800 hover:text-white hover:shadow-lg hover shadow-sand-800",
          "mx-2",
          "min-h-10",
          "inline-flex flex-row items-center"
        )}
        aria-label="Toggle jokers"
        pressed={allowCheat}
        onPressedChange={toggleAllowCheat}
        title="Simulate subtly sorting each hand"
      >
        <ToggleStatus status={allowCheat} />
        Cheat?
      </Toggle.Root>
      <Toggle.Root
        className={clsx(
          "bg-sand-400 p-2 rounded-xl whitespace-nowrap",
          "hover:bg-sand-800 hover:text-white hover:shadow-lg hover shadow-sand-800",
          "mx-2",
          "min-h-10",
          "inline-flex flex-row items-center"
        )}
        aria-label="Toggle jokers"
        pressed={showCurrentScore}
        onPressedChange={setShowCurrentScore}
        title="Simulate subtly sorting each hand"
      >
        <ToggleStatus status={showCurrentScore} />
        Show score?
      </Toggle.Root>

      <span className={clsx("bg-sand-400 p-2 rounded-xl", "mx-2", "min-h-10  whitespace-nowrap")}>
        <label htmlFor="curNumRevealedCards">
          # revealed cards
          <input
            id="curNumRevealedCards"
            type="text"
            size={1}
            className="ml-1 pl-1 rounded-sm"
            value={curNumRevealedCards}
            onChange={(e) => {
              setCurNumRevealedCards(toNumber(e.target.value));
            }}
            onBlur={(e) => {
              e.preventDefault();
              if (curNumRevealedCards < 0 || curNumRevealedCards > numCardsPerHand) {
                alert(`Number of revealed cards must be non-negative and less than ${numCardsPerHand}!`);
                setCurNumRevealedCards(numRevealedCards);
                return;
              }
              setNumRevealedCards(curNumRevealedCards);
            }}
            pattern="[0-9]*"
          />
        </label>
      </span>

      <span className={clsx("bg-sand-400 p-2 rounded-xl", "mx-2", "h-10")}>
        <label htmlFor="curNumCardsPerHand">
          # cards per hand
          <input
            id="curNumCardsPerHand"
            type="text"
            size={1}
            className="ml-1 pl-1 rounded-sm"
            value={curNumCardsPerHand}
            onChange={(e) => {
              setCurNumCardsPerHand(toNumber(e.target.value));
            }}
            onBlur={(e) => {
              e.preventDefault();
              if (curNumCardsPerHand < 1 || curNumCardsPerHand > MAX_NUM_CARDS_PER_HAND) {
                alert(`Number of cards per hand must be positive and less than ${MAX_NUM_CARDS_PER_HAND}!`);
                setCurNumCardsPerHand(numCardsPerHand);
                return;
              }
              setNumCardsPerHand(curNumCardsPerHand);
            }}
            pattern="[0-9]*"
          />
        </label>
      </span>

      <span className={clsx("bg-sand-400 p-2 rounded-xl", "mx-2", "h-10")}>
        <label htmlFor="curNumHandsPerGame">
          # hands per game
          <input
            id="curNumHandsPerGame"
            type="text"
            size={1}
            className="ml-1 pl-1 rounded-sm"
            value={curNumHandsPerGame}
            onChange={(e) => {
              setCurNumHandsPerGame(toNumber(e.target.value));
            }}
            onBlur={(e) => {
              e.preventDefault();
              if (curNumHandsPerGame < 1 || curNumHandsPerGame > MAX_NUM_HANDS_PER_GAME) {
                alert(`Number of hands per game must be positive and less than ${MAX_NUM_HANDS_PER_GAME}!`);
                setCurNumHandsPerGame(numHandsPerGame);
                return;
              }
              setNumHandsPerGame(curNumHandsPerGame);
            }}
            pattern="[0-9]*"
          />
        </label>
      </span>

      <Toolbar.Button
        className={clsx(
          "bg-sand-400 p-2 rounded-xl",
          "hover:bg-sand-800 hover:text-white hover:shadow-lg hover shadow-sand-800",
          "mx-2",
          "h-10",
          "inline-flex flex-row items-center"
        )}
        onClick={() => {
          newHands();
          setShowCards(false);
        }}
      >
        Generate new hands
      </Toolbar.Button>
    </Toolbar.Root>
  );
}

const ToggleStatus = ({ status }: { status: boolean }) => {
  return (
    <span
      className={clsx(
        "w-12 h-6 inline-flex flex-row",
        status ? "justify-end" : "justify-start",
        "border border-solid border-gray-300 rounded-[3em]"
      )}
    >
      <motion.span
        className={clsx("rounded-[300px] w-6 h-6", status ? "bg-green-700" : "bg-gray-300")}
        layout="position"
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        initial={false}
      ></motion.span>
    </span>
  );
};

export default PreferencesToolbar;
