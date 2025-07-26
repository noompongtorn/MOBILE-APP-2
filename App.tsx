// App.tsx
import {View, StyleSheet, LogBox} from 'react-native';
import React from 'react';
import Routes from './src/routes/routes';
import {Provider} from 'react-redux';
import store from '@lib/store/store';
import ModalFunction from '@component/ModalFunction';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <Provider store={store}>
      <ModalFunction />
      <View style={styles.container}>
        <Routes />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default App;
