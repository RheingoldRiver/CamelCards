import { cloneDeep, random, range, sample, values, sampleSize } from "lodash";
import { Hand, JOKER, MAX_ALLOWED_BID, MIN_ALLOWED_BID } from "./constants";
import { POSSIBLE_CARDS, POSSIBLE_HAND_TYPES } from "./constants";
import { Card } from "./constants";

export function maxPossibleScore(hands: Hand[]) {
  return hands
    .map((x) => x.bid.bid)
    .sort()
    .reduce((acc, bid, i) => {
      return acc + (i + 1) * bid;
    }, 0);
}

function defaultScore(hand: Card[]) {
  return hand.reduce((acc, card) => acc * 15 + card.value, 0);
}

function cheatScore(hand: Card[]) {
  return defaultScore([...hand].sort((a, b) => a.value - b.value));
}

function counter(values) {
  let count = {};
  for (let value of values) {
    if (value in count) {count[value]++;}
    else {count[value] = 1;}
  }
  return count;
}

function defaultHandType(hand: Card[]) {
  const valueCounts = Object.values(counter(hand)).sort((a, b) => b-a);
  switch (valueCounts[0]) {
    case 5:
      return POSSIBLE_HAND_TYPES.FiveKind;
    case 4:
      return POSSIBLE_HAND_TYPES.FourKind;
    case 3:
      if (valueCounts[1] === 2) {
        return POSSIBLE_HAND_TYPES.FullHouse;
      } else {
        return POSSIBLE_HAND_TYPES.ThreeKind;
      }
    case 2:
      if (valueCounts[1] === 2) {
        return POSSIBLE_HAND_TYPES.TwoPair;
      } else {
        return POSSIBLE_HAND_TYPES.OnePair;
      }
    default:
      return POSSIBLE_HAND_TYPES.HighCard;
  }
}

function jokerHandType(hand: Card[]) {
  const valueCounts = counter(hand);
  let [maxKey, maxValue] = [JOKER, 0];
  for (let card in valueCounts) {
    if (counter[card] > maxValue && card !== JOKER) {
      [maxKey, maxValue] = [card, valueCounts[card]];
    }
  }

  hand = [...hand];
  for (let i in hand) {
    if (hand[i] === JOKER) {hand[i] = maxKey;}
  }

  return defaultHandType(hand);
}

function getHandScore(hand: Card[], jokers: boolean, cheat: boolean) {
  let handType;
  if (jokers) {
    handType = jokerHandType(hand);
  } else {
    handType = defaultHandType(hand);
  }

  let handScore;
  if (cheat) {
    handScore = cheatScore(hand);
  } else {
    handScore = defaultScore(hand);
  }

  return handType.value * 10e8 + handScore;
}

function cmpHand(hand1: Hand, hand2: Hand, jokers: boolean, cheat: boolean) {
  return getHandScore(hand1.cards, jokers, cheat) - getHandScore(hand2.cards, jokers, cheat);
}

export function actualScore(hands: Hand[], jokers: boolean, cheat: boolean) {
  hands = cloneDeep(hands);
  if (jokers) {
    hands.forEach((hand, i) => {
      hands[i].cards = hand.cards.map((c) => c.name === POSSIBLE_CARDS.Jack.name ? JOKER : c);
    });
  }
  
  const sortedHands = hands.sort((h1, h2) => -cmpHand(h1, h2, jokers, cheat));
  return sortedHands.map((h) => h.bid.bid).reduce((acc, bid, i) => {
    return acc + (i + 1) * bid;
  }, 0);
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

export function randomHandIndices(numCardsRevealed: number, numCardsPerHand: number) {
  return sampleSize(range(numCardsPerHand), numCardsRevealed);
}
