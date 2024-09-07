// jest.config.js
module.exports = {
  setupFiles: ['./tests/setupTests.js'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^firebase/auth$': '<rootDir>/__mocks__/firebase.js',
    '^axios$': '<rootDir>/__mocks__/axios.js',
    '^chart.js$': '<rootDir>/src/__mocks__/chart.js',
    '^react-chartjs-2$': '<rootDir>/src/__mocks__/react-chartjs-2.js',
  },
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios|some-other-module-to-transform).+\\.js$',
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
};
