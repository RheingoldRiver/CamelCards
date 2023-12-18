import { useContext } from "react";
import { Modal } from "../Modal/Modal";
import { GameStateContext } from "../GameStateProvider/GameStateProvider";
import * as Dialog from "@radix-ui/react-dialog";
import { actualScore, maxPossibleScore } from "../../gameHelpers";

export const GameOverModal = () => {
  const { modalOpen, setModalOpen, hands, useJokers, allowCheat } = useContext(GameStateContext);
  const yourScore = actualScore(hands, useJokers, allowCheat);
  const maxScore = maxPossibleScore(hands);
  return (
    <Modal open={modalOpen} onOpenChange={setModalOpen} trigger={<div />}>
      <Dialog.Title className="text-5xl font-bold text-md mb-2">Yay!</Dialog.Title>
      <Dialog.Description className="italic mb-1">
        Camel Cards isn't multiplayer, so you didn't win or lose!
      </Dialog.Description>
      You got <span className="text-3xl">{yourScore}</span> points out of a possible{" "}
      <span className="text-3xl">{maxScore}</span> for this hand. That's{" "}
      <span className="text-3xl">{maxScore === 0 ? "NaN" : ((yourScore / maxScore) * 100).toFixed(2)}%!</span>
    </Modal>
  );
};
