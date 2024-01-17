module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest-setup.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx,js}'],
  coveragePathIgnorePatterns: [
    'src/config/'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!expo-linear-gradient|@unimodule/core|react-native-skeleton-content|react-native)/',
  ],
  globals: {
    'ts-config': {
      tsConfig: 'tsconfig.jest.json',
    },
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  coverageDirectory: 'coverage',
  moduleDirectories: ['node_modules'],
};
