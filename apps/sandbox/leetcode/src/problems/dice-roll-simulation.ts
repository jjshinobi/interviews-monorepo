export function dieSimulator(n: number, rollMax: number[]): number {
  const MOD = 1_000_000_007;

  // Memo: dp[pos][lastNum][count]
  const memo = new Map<string, number>();

  const dp = (pos: number, last: number, count: number): number => {
    if (pos === n) return 1;

    const key = `${pos},${last},${count}`;
    if (memo.has(key)) return memo.get(key)!;

    let total = 0;

    for (let i = 0; i < 6; i++) {
      if (i === last) {
        if (count + 1 <= rollMax[i]) {
          total = (total + dp(pos + 1, i, count + 1)) % MOD;
        }
      } else {
        total = (total + dp(pos + 1, i, 1)) % MOD;
      }
    }

    memo.set(key, total);
    return total;
  };

  return dp(0, -1, 0);
}
