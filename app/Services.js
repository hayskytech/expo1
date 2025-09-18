import { Stack } from 'expo-router'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Services() {
  return (
    <>
      <Stack.Screen options={{ title: 'My Services' }} />
      <View style={styles.container}>
        <Text style={styles.description}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio, harum. Quos nisi sint esse, molestias consequatur commodi accusantium. Et omnis officia ea accusantium tempora! Accusamus molestiae doloribus alias expedita excepturi.</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  description: {
    fontSize: 16,
    lineHeight: 24
  }
});
