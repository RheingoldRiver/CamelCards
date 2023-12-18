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
}

export const MIN_ALLOWED_BID = 1;

export const MAX_ALLOWED_BID = 100;

export const DEFAULT_NUM_CARDS_PER_HAND = 5;

export const DEFAULT_NUM_HANDS_PER_GAME = 25;

export interface Cards {
  [key: string]: Card;
}

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
};

export const JOKER = {
  name: "Joker",
  display: "J",
  value: 1,
};
