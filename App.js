import React from 'react';
import {StyleSheet, View} from 'react-native';
import Card from './src/Card/Card';

const App = () => {
  return (
    <View style={styles.container}>
      <Card />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
  },
});

export default App;
