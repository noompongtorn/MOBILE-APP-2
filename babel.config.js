module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@component': './src/components',
          '@assets': './src/assets',
          '@utils': './src/utils',
          '@lib': './src/lib',
        },
      },
    ],
  ],
};
