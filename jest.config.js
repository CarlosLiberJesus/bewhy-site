module.exports = {
  displayName: "bewhy-site",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],

  // Enable ESM support for Angular 20
  extensionsToTreatAsEsm: [".ts"],

  // Transform files
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "<rootDir>/tsconfig.spec.json",
      },
    ],
    "^.+\\.(js|jsx|mjs)$": [
      "babel-jest",
      {
        presets: [["@babel/preset-env", { targets: { node: "current" } }]],
      },
    ],
    // Support for Angular template files
    "^.+\\.html$": ["jest-transform-stub", { stringifyContent: true }],
    "^.+\\.(css|scss|sass)$": "jest-transform-stub",
  },

  // Module resolution
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "mjs", "html"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

  // Transform Angular modules
  transformIgnorePatterns: ["node_modules/(?!(@angular|rxjs|lucide-angular)/)"],

  // Test patterns
  testMatch: ["**/+(*.)+(spec|test).+(ts|js)?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],

  // Coverage configuration
  collectCoverageFrom: [
    "src/**/*.{ts,js}",
    "!src/**/*.d.ts",
    "!src/main.ts",
    "!**/*.interface.ts",
    "!**/*.model.ts",
    "!**/*.type.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["html", "text-summary", "lcov"],

  // Performance optimization
  maxWorkers: "50%",
};
