import { cloneDeep, random, range, sample, values, sampleSize, shuffle, toNumber } from "lodash";
import { Hand, JOKER, MAX_ALLOWED_BID, MIN_ALLOWED_BID, TEST_CARD_MAP } from "./constants";
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
  return defaultScore([...hand].sort((a, b) => b.value - a.value));
}

function counter(values: Card[]) {
  return values.reduce((acc: { [key: string]: number }, val) => {
    return { ...acc, [val.name]: 1 + (acc[val.name] ?? 0) };
  }, {});
}

function defaultHandType(hand: Card[]) {
  const valueCounts = Object.values(counter(hand)).sort((a, b) => b - a);
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

function getHandScore(cards: Card[], jokers: boolean, cheat: boolean) {
  if (jokers) {
    const valueCounts = counter(cards);
    let [maxKey, maxValue] = [JOKER.name, 0];
    Object.keys(valueCounts).forEach((card) => {
      if (valueCounts[card] > maxValue && card !== JOKER.name) {
        [maxKey, maxValue] = [card, valueCounts[card]];
      }
    });
    cards = cards.map((card) => {
      if (card.name === JOKER.name) {
        return POSSIBLE_CARDS[maxKey];
      }
      return card;
    });
  }
  const handType = defaultHandType(cards);

  let handScore;
  if (cheat) {
    handScore = cheatScore(cards);
  } else {
    handScore = defaultScore(cards);
  }
  return handType.value * 10e8 + handScore;
}

export function getSortedHands(hands: Hand[], jokers: boolean, cheat: boolean) {
  hands = cloneDeep(hands);
  if (jokers) {
    hands.forEach((hand, i) => {
      hands[i].cards = hand.cards.map((c) => (c.name === POSSIBLE_CARDS.Jack.name ? JOKER : c));
    });
  }

  return hands.sort((h1, h2) => {
    return getHandScore(h1.cards, jokers, cheat) - getHandScore(h2.cards, jokers, cheat);
  });
}

export function getSortedKeys(hands: Hand[], jokers: boolean, cheat: boolean) {
  return getSortedHands(hands, jokers, cheat).map((h) => h.key);
}

export function actualScore(hands: Hand[], jokers: boolean, cheat: boolean) {
  return getSortedHands(hands, jokers, cheat)
    .map((h) => h.bid.bid)
    .reduce((acc, bid, i) => {
      return acc + (i + 1) * bid;
    }, 0);
}

export function generateHands(numHands: number, numCardsPerHand: number): Hand[] {
  return range(numHands).map((i) => ({
    bid: {
      bid: random(MIN_ALLOWED_BID, MAX_ALLOWED_BID),
      key: i.toString(),
    },
    key: i.toString(),
    cards: range(numCardsPerHand).map(() => sample(values(POSSIBLE_CARDS)) as Card),
    cardRevealOrder: shuffle(range(numCardsPerHand)),
  }));
}

export function randomHandIndices(numCardsRevealed: number, numCardsPerHand: number) {
  return sampleSize(range(numCardsPerHand), numCardsRevealed);
}

export function testStringToHand(s: string) {
  const [cards, bid] = s.split(" ");
  return {
    bid: {
      bid: toNumber(bid),
      key: bid,
    },
    cards: cards.split("").map((c) => TEST_CARD_MAP[c as keyof typeof TEST_CARD_MAP]),
    cardRevealOrder: range(cards.length),
    key: bid,
  };
}
