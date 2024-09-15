import type {Config} from 'jest';
import { TextEncoder } from 'node:util'
global.TextEncoder = TextEncoder

const config: Config = {  
  preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      '^.+\\.tsx?$': [
        'ts-jest',
        {
          tsconfig: 'tsconfig.test.json',
          isolatedModules: true,          
        },
      ],
    },
    
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
};

export default config;