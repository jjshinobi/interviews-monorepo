import { minMeetingRooms } from "../../src/problems/meeting-rooms-ii";

describe("minMeetingRooms", () => {
  it("should return 2 for overlapping intervals", () => {
    const intervals = [
      [0, 30],
      [5, 10],
      [15, 20],
    ];
    expect(minMeetingRooms(intervals)).toBe(2);
  });

  it("should return 1 for non-overlapping intervals", () => {
    const intervals = [
      [7, 10],
      [2, 4],
    ];
    expect(minMeetingRooms(intervals)).toBe(1);
  });

  it("should return 0 for empty intervals", () => {
    expect(minMeetingRooms([])).toBe(0);
  });

  it("should return 3 for tightly overlapping intervals", () => {
    const intervals = [
      [1, 10],
      [2, 7],
      [3, 19],
      [8, 12],
      [10, 20],
      [11, 30],
    ];
    expect(minMeetingRooms(intervals)).toBe(4);
  });
});
