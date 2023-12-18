import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { Hand } from "../../constants";
import { DEFAULT_NUM_CARDS_PER_HAND, DEFAULT_NUM_HANDS_PER_GAME } from "../../constants";
import { generateHands } from "../../gameHelpers";
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
  newHands: () => void;
  swapBids: (i1: number, i2: number) => void;
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
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
  newHands: () => {},
  swapBids: () => {},
  modalOpen: false,
  setModalOpen: () => {},
};

export const GameStateContext = createContext(DEFAULT_GAME_STATE);
export default function GameStateProvider({ children }: { children: ReactNode }) {
  const [useJokers, setUseJokers] = useState<boolean>(false);
  const [numCardsPerHand, setNumCardsPerHand] = useState<number>(DEFAULT_NUM_CARDS_PER_HAND);
  const [numHandsPerGame, setNumHandsPerGame] = useState<number>(DEFAULT_NUM_HANDS_PER_GAME);
  const [allowCheat, setAllowCheat] = useState<boolean>(false);
  const [showCards, setShowCards] = useState<boolean>(false);
  const [scores, setScores] = useState<number[]>([]);
  const [hands, setHands] = useState<Hand[]>(() => {
    return generateHands(numHandsPerGame, numCardsPerHand);
  });
  const [modalOpen, setModalOpen] = useState<boolean>(false);
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
    setHands(
      produce(hands, (nextHands) => {
        const temp = nextHands[i1].bid;
        nextHands[i1].bid = nextHands[i2].bid;
        nextHands[i2].bid = temp;
      })
    );
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
        newHands,
        swapBids,
        modalOpen,
        setModalOpen,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
}
