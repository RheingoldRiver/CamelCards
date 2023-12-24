import { expect, test } from "vitest";
import { actualScore, maxPossibleScore, testStringToHand } from "./gameHelpers";
import { POSSIBLE_CARDS } from "./constants";

test("max possible score works", () => {
  const hands = [
    {
      bid: {
        bid: 5,
        key: "abc",
      },
      cards: [POSSIBLE_CARDS.Jack],
      cardRevealOrder: [0],
      key: "abc",
    },
    {
      bid: {
        bid: 4,
        key: "abc",
      },
      cards: [POSSIBLE_CARDS.Jack],
      cardRevealOrder: [0],
      key: "abc",
    },
    {
      bid: {
        bid: 3,
        key: "abc",
      },
      cards: [POSSIBLE_CARDS.Jack],
      cardRevealOrder: [0],
      key: "abc",
    },
  ];
  expect(maxPossibleScore(hands)).toBe(5 * 3 + 4 * 2 + 3 * 1);
});

test("joker rank works", () => {
  const hands = [
    {
      bid: {
        bid: 5,
        key: "abc",
      },
      cards: [POSSIBLE_CARDS.Jack],
      cardRevealOrder: [0],
      key: "abc",
    },
    {
      bid: {
        bid: 4,
        key: "abc",
      },
      cards: [POSSIBLE_CARDS.Ten],
      cardRevealOrder: [0],
      key: "abc",
    },
    {
      bid: {
        bid: 3,
        key: "abc",
      },
      cards: [POSSIBLE_CARDS.Two],
      cardRevealOrder: [0],
      key: "abc",
    },
  ];
  expect(maxPossibleScore(hands)).toBe(5 * 3 + 4 * 2 + 3 * 1);
  expect(actualScore(hands, false, false)).toBe(5 * 3 + 4 * 2 + 3 * 1);
  expect(actualScore(hands, true, false)).toBe(4 * 3 + 3 * 2 + 5 * 1);
});

test("cheating is in the correct order", () => {
  const hands = [
    {
      bid: {
        bid: 5,
        key: "abc",
      },
      cards: [POSSIBLE_CARDS.Three, POSSIBLE_CARDS.Ace],
      cardRevealOrder: [0],
      key: "abc",
    },
    {
      bid: {
        bid: 4,
        key: "abc",
      },
      cards: [POSSIBLE_CARDS.King, POSSIBLE_CARDS.Two],
      cardRevealOrder: [0],
      key: "abc",
    },
    {
      bid: {
        bid: 3,
        key: "abc",
      },
      cards: [POSSIBLE_CARDS.King, POSSIBLE_CARDS.Four],
      cardRevealOrder: [0],
      key: "abc",
    },
  ];
  expect(maxPossibleScore(hands)).toBe(5 * 3 + 4 * 2 + 3 * 1);
  expect(actualScore(hands, false, false)).toBe(3 * 3 + 4 * 2 + 5 * 1);
  expect(actualScore(hands, false, true)).toBe(5 * 3 + 3 * 2 + 4 * 1);
});

const aocTest = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

test("aoc test input", () => {
  const hands = aocTest.split("\n").map((s) => testStringToHand(s));
  expect(actualScore(hands, false, false)).toBe(6440);
  expect(actualScore(hands, true, false)).toBe(5905);
});
