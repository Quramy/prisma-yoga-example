const config = {
  testMatch: ["<rootDir>/tests/**/*.+(test|spec).[t|j]s"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { diagnostics: false }],
  },
  testEnvironment: "@quramy/jest-prisma-node/environment",
  setupFilesAfterEnv: ["@quramy/prisma-fabbrica/scripts/jest-prisma"],
};

export default config;
