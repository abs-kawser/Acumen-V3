// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
// };

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    
    ['react-native-paper/babel', {loose: true}],
    'react-native-reanimated/plugin',
 

    // ["react-native-worklets/plugin"],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
