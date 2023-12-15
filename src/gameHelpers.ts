import { cloneDeep, random, range, sample, values } from "lodash";
import { Hand, JOKER, MAX_ALLOWED_BID, MIN_ALLOWED_BID } from "./constants";
import { POSSIBLE_CARDS } from "./constants";
import { Card } from "./constants";

export function maxPossibleScore(hands: Hand[]) {
  return hands
    .map((x) => x.bid.bid)
    .sort()
    .reverse()
    .reduce((acc, bid, i) => {
      return acc + (i + 1) * bid;
    }, 0);
}

export function score(hand: Card[]) {
  const tiebreakerPoints = hand.reduce((acc, card, i) => 15 ** (-1 * (i + 1)) * card.value + acc, 0);
  // actualPoints = 0;

  return tiebreakerPoints;
}

export function actualScore(hands: Hand[], jokers: boolean, cheat: boolean) {
  const sortedHands = cloneDeep(hands);

  if (jokers) {
    sortedHands.forEach((hand) => {
      hand.cards.forEach((card, i) => {
        if (card.name === POSSIBLE_CARDS.Jack.name) hand.cards[i] = JOKER;
      });
    });
  }

  if (cheat) {
    sortedHands.forEach((hand) => hand.cards.sort((x, y) => x.value - y.value));
  }

  sortedHands.sort((a, b) => {
    return score(a.cards) - score(b.cards);
  });
  return sortedHands.reduce((acc, hand, i) => acc + (i + 1) * hand.bid.bid, 0);
}

export function generateHands(numHands: number, numCardsPerHand: number): Hand[] {
  return range(numHands).map(() => ({
    bid: {
      bid: random(MIN_ALLOWED_BID, MAX_ALLOWED_BID),
      key: crypto.randomUUID(),
    },
    key: crypto.randomUUID(),
    cards: range(numCardsPerHand).map(() => sample(values(POSSIBLE_CARDS)) as Card),
  }));
}
