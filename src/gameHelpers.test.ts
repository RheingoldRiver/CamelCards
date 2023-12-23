import { expect, test } from "vitest";
import { maxPossibleScore } from "./gameHelpers";
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
