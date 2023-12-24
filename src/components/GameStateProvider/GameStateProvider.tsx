import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { DEFAULT_NUM_CARDS_REVEALED, Hand } from "../../constants";
import { DEFAULT_NUM_CARDS_PER_HAND, DEFAULT_NUM_HANDS_PER_GAME } from "../../constants";
import { actualScore, generateHands } from "../../gameHelpers";
import { produce } from "immer";

interface GameState {
  useJokers: boolean;
  toggleUseJokers: () => void;
  numCardsPerHand: number;
  setNumCardsPerHand: Dispatch<SetStateAction<number>>;
  numHandsPerGame: number;
  setNumHandsPerGame: Dispatch<SetStateAction<number>>;
  allowCheat: boolean;
  toggleAllowCheat: () => void;
  showCards: boolean;
  setShowCards: Dispatch<SetStateAction<boolean>>;
  hands: Hand[];
  scores: number[];
  setScores: Dispatch<SetStateAction<number[]>>;
  maxPossibleScores: number[];
  setMaxPossibleScores: Dispatch<SetStateAction<number[]>>;
  newHands: () => void;
  swapBids: (i1: number, i2: number) => void;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  addedScore: number;
  removedScore: number;
  numRevealedCards: number;
  setNumRevealedCards: Dispatch<SetStateAction<number>>;
}

const DEFAULT_GAME_STATE: GameState = {
  useJokers: false,
  toggleUseJokers: () => {},
  numCardsPerHand: 0,
  setNumCardsPerHand: () => {},
  numHandsPerGame: 0,
  setNumHandsPerGame: () => {},
  allowCheat: false,
  toggleAllowCheat: () => {},
  showCards: false,
  setShowCards: () => {},
  hands: [],
  scores: [],
  setScores: () => {},
  maxPossibleScores: [],
  setMaxPossibleScores: () => {},
  newHands: () => {},
  swapBids: () => {},
  modalOpen: false,
  setModalOpen: () => {},
  addedScore: 0,
  removedScore: 0,
  numRevealedCards: 0,
  setNumRevealedCards: () => {},
};

export const GameStateContext = createContext(DEFAULT_GAME_STATE);
export default function GameStateProvider({ children }: { children: ReactNode }) {
  const [useJokers, setUseJokers] = useState<boolean>(false);
  const [numCardsPerHand, setNumCardsPerHand] = useState<number>(DEFAULT_NUM_CARDS_PER_HAND);
  const [numHandsPerGame, setNumHandsPerGame] = useState<number>(DEFAULT_NUM_HANDS_PER_GAME);
  const [allowCheat, setAllowCheat] = useState<boolean>(false);
  const [showCards, setShowCards] = useState<boolean>(false);
  const [scores, setScores] = useState<number[]>([]);
  const [maxPossibleScores, setMaxPossibleScores] = useState<number[]>([]);
  const [hands, setHands] = useState<Hand[]>(() => {
    return generateHands(numHandsPerGame, numCardsPerHand);
  });
  const [numRevealedCards, setNumRevealedCards] = useState<number>(DEFAULT_NUM_CARDS_REVEALED);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [addedScore, setAddedScore] = useState<number>(0);
  const [removedScore, setRemovedScore] = useState<number>(0);
  const [scoreRemoveTimeout, setScoreRemoveTimeout] = useState<ReturnType<typeof setTimeout>>(() => {
    return setTimeout(() => {}, 0);
  });
  const [scoreAddTimeout, setScoreAddTimeout] = useState<ReturnType<typeof setTimeout>>(() => {
    return setTimeout(() => {}, 0);
  });
  function toggleUseJokers() {
    setUseJokers((x) => !x);
  }

  function toggleAllowCheat() {
    setAllowCheat((x) => !x);
  }

  function newHands() {
    setHands(generateHands(numHandsPerGame, numCardsPerHand));
  }

  function swapBids(i1: number, i2: number) {
    const nextHands = produce(hands, (draftHands) => {
      const temp = draftHands[i1].bid;
      draftHands[i1].bid = draftHands[i2].bid;
      draftHands[i2].bid = temp;
    });
    const delta = actualScore(nextHands, useJokers, allowCheat) - actualScore(hands, useJokers, allowCheat);
    if (delta > 0) {
      setAddedScore(1 + addedScore);
      setRemovedScore(0);
      clearTimeout(scoreAddTimeout);
      setScoreAddTimeout(
        setTimeout(() => {
          setAddedScore(0);
        }, 2000)
      );
    } else if (delta < 0) {
      setRemovedScore(1 + removedScore);
      setAddedScore(0);
      clearTimeout(scoreRemoveTimeout);
      setScoreRemoveTimeout(
        setTimeout(() => {
          setRemovedScore(0);
        }, 2000)
      );
    }
    setHands(nextHands);
  }

  return (
    <GameStateContext.Provider
      value={{
        useJokers,
        toggleUseJokers,
        numCardsPerHand,
        setNumCardsPerHand,
        numHandsPerGame,
        setNumHandsPerGame,
        allowCheat,
        toggleAllowCheat,
        showCards,
        setShowCards,
        hands,
        scores,
        setScores,
        maxPossibleScores,
        setMaxPossibleScores,
        newHands,
        swapBids,
        modalOpen,
        setModalOpen,
        addedScore,
        removedScore,
        numRevealedCards,
        setNumRevealedCards,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
}
