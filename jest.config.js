module.exports = {
  moduleNameMapper: {
    '^@App/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testMatch: ['**/*.test.ts'],
  testEnvironment: 'node'
}
