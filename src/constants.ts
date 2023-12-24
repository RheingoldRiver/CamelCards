export interface Card {
  name: string;
  display: string;
  value: number;
}

export interface Bid {
  bid: number;
  key: string;
}

export interface Hand {
  bid: Bid;
  cards: Card[];
  key: string;
  cardRevealOrder: number[];
}

export interface HandType {
  name: string;
  value: number;
}

export const MIN_ALLOWED_BID = 1;

export const MAX_ALLOWED_BID = 100;

export const DEFAULT_NUM_CARDS_PER_HAND = 5;

export const DEFAULT_NUM_HANDS_PER_GAME = 25;

export const DEFAULT_NUM_CARDS_REVEALED = 3;

export const MAX_NUM_CARDS_PER_HAND = 20;

export const MAX_NUM_HANDS_PER_GAME = 100;

export interface Cards {
  [key: string]: Card;
}

export const JOKER = {
  name: "Joker",
  display: "J",
  value: 1,
};

export const POSSIBLE_CARDS: Cards = {
  Ace: {
    name: "Ace",
    display: "A",
    value: 14,
  },
  King: {
    name: "King",
    display: "K",
    value: 13,
  },
  Queen: {
    name: "Queen",
    display: "Q",
    value: 12,
  },
  Jack: {
    name: "Jack",
    display: "J",
    value: 11,
  },
  Ten: {
    name: "Ten",
    display: "T",
    value: 10,
  },
  Nine: {
    name: "Nine",
    display: "9",
    value: 9,
  },
  Eight: {
    name: "Eight",
    display: "8",
    value: 8,
  },
  Seven: {
    name: "Seven",
    display: "7",
    value: 7,
  },
  Six: {
    name: "Six",
    display: "6",
    value: 6,
  },
  Five: {
    name: "Five",
    display: "5",
    value: 5,
  },
  Four: {
    name: "Four",
    display: "4",
    value: 4,
  },
  Three: {
    name: "Three",
    display: "3",
    value: 3,
  },
  Two: {
    name: "Two",
    display: "2",
    value: 2,
  },
  Joker: JOKER,
};

export const TEST_CARD_MAP = {
  A: POSSIBLE_CARDS.Ace,
  K: POSSIBLE_CARDS.King,
  Q: POSSIBLE_CARDS.Queen,
  J: POSSIBLE_CARDS.Jack,
  T: POSSIBLE_CARDS.Ten,
  ["9"]: POSSIBLE_CARDS.Nine,
  ["8"]: POSSIBLE_CARDS.Eight,
  ["7"]: POSSIBLE_CARDS.Seven,
  ["6"]: POSSIBLE_CARDS.Six,
  ["5"]: POSSIBLE_CARDS.Five,
  ["4"]: POSSIBLE_CARDS.Four,
  ["3"]: POSSIBLE_CARDS.Three,
  ["2"]: POSSIBLE_CARDS.Two,
};

interface PossibleHands {
  [key: string]: HandType;
}

export const POSSIBLE_HAND_TYPES: PossibleHands = {
  HighCard: {
    name: "High Card",
    value: 1,
  },
  OnePair: {
    name: "One Pair",
    value: 2,
  },
  TwoPair: {
    name: "Two Pair",
    value: 3,
  },
  ThreeKind: {
    name: "Three of a Kind",
    value: 4,
  },
  FullHouse: {
    name: "Full House",
    value: 5,
  },
  FourKind: {
    name: "Four of a Kind",
    value: 6,
  },
  FiveKind: {
    name: "Five of a Kind",
    value: 7,
  },
};
