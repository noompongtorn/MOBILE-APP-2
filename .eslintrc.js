module.exports = {
  root: true,
  extends: ['@react-native-community'],
  parserOptions: {
    ecmaVersion: 2024,
    sourceType: 'module',
  },
  env: {
    es2021: true,
    node: true,
    'react-native/react-native': true,
  },
  plugins: [
    'react',
    'react-native',
    'unused-imports', // Add unused-imports plugin
  ],
  rules: {
    'prettier/prettier': ['error', {endOfLine: 'auto'}],
    'no-console': 'warn',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-unused-styles': 'error',
    'unused-imports/no-unused-imports': 'error', // Automatically remove unused imports
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
  },
};
