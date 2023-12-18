import { useContext, type FC, ReactNode } from "react";
import * as Toolbar from "@radix-ui/react-toolbar";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import { actualScore } from "../../gameHelpers";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

interface Props {}

const GameActions: FC<Props> = () => {
  const {
    scores,
    setScores,
    newHands,
    showCards,
    setShowCards,
    hands,
    useJokers,
    allowCheat,
    setModalOpen,
    addedScore,
    removedScore,
  } = useContext(GameStateContext);
  return (
    <Toolbar.Root className="my-2" aria-label="Formatting options">
      <span className={clsx("bg-sand-400 p-2 rounded-xl", "mx-2", "h-10")}>
        Total score: {scores.reduce((acc, s) => acc + s, 0)}
      </span>
      <span className={clsx("bg-sand-400 p-2 rounded-xl", "mx-2", "h-10", "relative")}>
        <span className={clsx("absolute bottom-[-10px] left-[-10px] text-red-800 bold", "text-3xl")}>
          <AnimatedScoreChange show={removedScore}>---</AnimatedScoreChange>
        </span>
        Current score: {actualScore(hands, useJokers, allowCheat)}
        <span className={clsx("absolute top-[-14px] right-[-10px] text-green-800 bold", "text-2xl")}>
          <AnimatedScoreChange show={addedScore}>+++</AnimatedScoreChange>
        </span>
      </span>
      <Toolbar.Button
        className={clsx(
          showCards ? "bg-sand-300 text-sand-100" : "bg-sand-400",
          "p-2 rounded-xl",
          showCards ? "" : "hover:bg-sand-800 hover:text-white hover:shadow-lg hover shadow-sand-800",
          "mx-2",
          "h-10"
        )}
        style={{ marginLeft: "auto" }}
        onClick={() => {
          setModalOpen(true);
          if (showCards) return;
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

const AnimatedScoreChange = ({ show, children }: { show: number; children: ReactNode }) => {
  return (
    <AnimatePresence>
      {show > 0 && (
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          exit={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          key={show}
          layout="size"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
