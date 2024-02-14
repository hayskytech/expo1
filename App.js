import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30 }}>Haysky</Text>
      <Text>Hello world. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur et animi magnam consequuntur cupiditate deleniti velit dignissimos? Similique asperiores voluptatem velit eligendi dolorem, quidem quos tempore nesciunt, minus expedita reiciendis.</Text>
      <Button title='Hello' />

      <StatusBar style="auto" />
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
