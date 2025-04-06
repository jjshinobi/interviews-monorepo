import { getScore } from "../../../src/application/useCases/getScore";
import { createGame } from "../../../src/application/useCases/createGame";

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
