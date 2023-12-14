import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { Card } from "../../cards";
import { Bid } from "../../constants";

interface GameState {
  useJokers: boolean;
  toggleUseJokers: () => void;
  cardsPerHand: number;
  setCardsPerHand: Dispatch<SetStateAction<number>>;
  allowCheat: boolean;
  toggleAllowCheat: () => void;
  showCards: boolean;
  setShowCards: Dispatch<SetStateAction<boolean>>;
  hands: Card[][];
  setHands: Dispatch<SetStateAction<Card[][]>>;
  bids: Bid[];
  setBids: Dispatch<SetStateAction<Bid[]>>;
  scores: number[];
  setScores: Dispatch<SetStateAction<number[]>>;
}

const DEFAULT_GAME_STATE: GameState = {
  useJokers: false,
  toggleUseJokers: () => {},
  cardsPerHand: 0,
  setCardsPerHand: () => {},
  allowCheat: false,
  toggleAllowCheat: () => {},
  showCards: false,
  setShowCards: () => {},
  hands: [],
  setHands: () => {},
  bids: [],
  setBids: () => {},
  scores: [],
  setScores: () => {},
};

export const GameStateContext = createContext(DEFAULT_GAME_STATE);
export default function GameStateProvider({ children }: { children: ReactNode }) {
  const [useJokers, setUseJokers] = useState<boolean>(false);
  const [cardsPerHand, setCardsPerHand] = useState<number>(5);
  const [allowCheat, setAllowCheat] = useState<boolean>(false);
  const [showCards, setShowCards] = useState<boolean>(false);
  const [hands, setHands] = useState<Card[][]>([]);
  const [bids, setBids] = useState<Bid[]>([]);
  const [scores, setScores] = useState<number[]>([]);
  function toggleUseJokers() {
    setUseJokers((x) => !x);
  }

  function toggleAllowCheat() {
    setAllowCheat((x) => !x);
  }

  return (
    <GameStateContext.Provider
      value={{
        useJokers,
        toggleUseJokers,
        cardsPerHand,
        setCardsPerHand,
        allowCheat,
        toggleAllowCheat,
        showCards,
        setShowCards,
        hands,
        setHands,
        bids,
        setBids,
        scores,
        setScores,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
}
