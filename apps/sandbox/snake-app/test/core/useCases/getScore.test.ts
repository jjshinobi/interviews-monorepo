import { createGame } from "../../../src/core/useCases/createGame.ts";
import { getScore } from "../../../src/core/useCases/getScore.ts";

describe("getScore", () => {
  it("should return initial score of 0", () => {
    const state = createGame({});

    expect(getScore({ state })).toBe(0);
  });

  it("should return the current score", () => {
    const state = createGame({});
    const stateWithScore = {
      ...state,
      score: 10,
    };

    expect(getScore({ state: stateWithScore })).toBe(10);
  });
});
