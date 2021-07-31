export default {
  preset: "ts-jest",
  testEnvironment: "node",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/commands/",
    "/src/utilities/log.ts",
    "/src/utilities/write-file.ts",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 90,
      statements: -20,
    },
  },
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testPathIgnorePatterns: ["/lib/"],
};
