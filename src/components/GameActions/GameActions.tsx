import { useContext, type FC, ReactNode } from "react";
import * as Toolbar from "@radix-ui/react-toolbar";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import { actualScore, maxPossibleScore } from "../../gameHelpers";
import clsx from "clsx";
import { motion } from "framer-motion";

interface Props {}

const GameActions: FC<Props> = () => {
  const {
    scores,
    setScores,
    showCards,
    setShowCards,
    hands,
    useJokers,
    allowCheat,
    setModalOpen,
    addedScore,
    removedScore,
    maxPossibleScores,
    setMaxPossibleScores,
    showCurrentScore,
  } = useContext(GameStateContext);
  const yourTotalScore = scores.reduce((acc, s) => acc + s, 0);
  const maxTotalScore = maxPossibleScores.reduce((acc, s) => acc + s, 0);
  const totalScorePct = maxTotalScore === 0 ? 0 : ((yourTotalScore / maxTotalScore) * 100).toFixed(2);
  return (
    <Toolbar.Root className="my-2 flex flex-row flex-wrap justify-start items-center gap-y-2">
      <span
        className={clsx(
          "flex flex-row items-center border-dashed border-4 border-sand-400 p-2 rounded-xl",
          "mx-2",
          "h-10"
        )}
      >
        Total score: <span className="font-bold mx-1">{yourTotalScore}</span> ({totalScorePct}%)
      </span>
      {showCurrentScore && (
        <span
          className={clsx(
            "flex flex-row items-center border-dashed border-4 border-sand-400 p-2 rounded-xl",
            "mx-2",
            "h-10",
            "relative"
          )}
        >
          <span className={clsx("absolute bottom-[-20px] left-[-10px] text-red-800 bold", "text-4xl")}>
            {removedScore > 0 && (
              <AnimatedScoreChange translation={10} show={removedScore}>
                ---
              </AnimatedScoreChange>
            )}
          </span>
          Current score: <span className="font-bold">{actualScore(hands, useJokers, allowCheat)}</span>
          <span className={clsx("absolute top-[-25px] right-[-10px] text-green-800 bold", "text-4xl")}>
            {addedScore > 0 && (
              <AnimatedScoreChange translation={-10} show={addedScore}>
                +++
              </AnimatedScoreChange>
            )}
          </span>
        </span>
      )}
      <Toolbar.Button
        className={clsx(
          showCards ? "bg-sand-300 text-sand-100" : "bg-sand-400",
          "p-2 rounded-xl",
          showCards ? "" : "hover:bg-sand-800 hover:text-white hover:shadow-lg hover shadow-sand-800",
          "mx-2",
          "h-10"
        )}
        onClick={() => {
          if (showCards) return;
          setModalOpen(true);
          setShowCards(true);
          setScores([...scores, actualScore(hands, useJokers, allowCheat)]);
          setMaxPossibleScores([...maxPossibleScores, maxPossibleScore(hands)]);
        }}
        title={showCards ? "Generate new hands to play again!" : undefined}
      >
        Play game with these bids!
      </Toolbar.Button>
    </Toolbar.Root>
  );
};

export default GameActions;

const AnimatedScoreChange = ({
  show,
  translation,
  children,
}: {
  show: number;
  translation: number;
  children: ReactNode;
}) => {
  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1, translateY: translation }}
      exit={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      key={show}
      layout="size"
      style={{
        transformOrigin: "center bottom",
      }}
    >
      {children}
    </motion.div>
  );
};
