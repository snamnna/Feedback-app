/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  // automock: false,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: ["json", "text", "lcov", "clover"],
  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node",
  ],
  setupFilesAfterEnv: [
    "jest-extended/all",
    "./src/testSetup.js",
    "jest-expect-message",
  ],
  testPathIgnorePatterns: ["/node_modules/"],
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)",
    "**/**/?(*.)+(spec|test).[tj]s?(x)",
  ],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  moduleNameMapper: {
    "@prisma/client": "<rootDir>/__mocks__/@prisma/client.js",
  },
  verbose: true,
};

module.exports = config;
