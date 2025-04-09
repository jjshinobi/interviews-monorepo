export function minMeetingRooms(intervals: number[][]): number {
  if (intervals.length === 0) return 0;

  const starts = intervals.map(([start]) => start).sort((a, b) => a - b);
  const ends = intervals.map(([, end]) => end).sort((a, b) => a - b);

  let rooms = 0;
  let endPtr = 0;

  for (let i = 0; i < starts.length; i++) {
    if (starts[i] < ends[endPtr]) {
      rooms += 1; // need a new room
    } else {
      endPtr += 1; // a room gets freed up
    }
  }

  return rooms;
}
