module.exports = {
  coveragePathIgnorePatterns: ['<rootDir>/__config__', '<rootDir>/src/reducers/index.js'],
  coverageReporters: ['json', 'lcov'],
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!src/index.js',
    '!src/components/App.js',
    '!src/store.js',
  ],
  globals: {
    __DEV__: false,
    __TEST__: true,
    ENV_CONFIG: {
      apiHost: 'http://0.0.0.0/',
    },
  },
  moduleNameMapper: {
    '\\.(css|scss)': '<rootDir>/node_modules/jest-css-modules',
    '\\.(svg|png|jpg|gif)': '<rootDir>/__mocks__/file-mock.js',
    'react-confirm': '<rootDir>/__mocks__/react-confirm.js',
  },
  modulePathIgnorePatterns: ['<rootDir>/__config__', '<rootDir>/__mocks__'],
  resetMocks: false,
  roots: ['<rootDir>/src'],
  setupFiles: [
    '<rootDir>/__config__/polyfills.js',
    '<rootDir>/__config__/global.js',
    '<rootDir>/__mocks__/fetch-mock.js',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  // testEnvironment: 'jsdom',
  testURL: 'http://localhost',
  testMatch: ['<rootDir>/src/**/?(*.)(spec).js?(x)'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  verbose: false,
}
