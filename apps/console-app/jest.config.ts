import type { Config } from "jest";

const config: Config = {
  testEnvironment: "node",
  testMatch: [`<rootDir>/test/**/*.+(ts|tsx|js)`],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  clearMocks: true,
};

export default config;
