import { StyleSheet, Text, View } from 'react-native';

import * as ExpoSquircleView from 'expo-squircle-view';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoSquircleView.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
