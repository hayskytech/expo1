import { Stack, router } from 'expo-router'
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function index() {
  return (
    <>
      <Stack.Screen options={{ title: 'Haysky Technologies' }} />
      <View style={styles.container}>
        <Text style={styles.heading}>Homepage</Text>
        <Text style={styles.description}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic, illum tempore nobis qui, sunt reiciendis quas nulla soluta eaque pariatur tenetur libero expedita accusamus vero corrupti consequatur enim optio deserunt.</Text>
        <TouchableOpacity style={[styles.button, styles.blueButton]} onPress={() => router.push('About')}>
          <Text style={styles.buttonText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.greenButton]} onPress={() => router.push('Services')}>
          <Text style={styles.buttonText}>Services</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.purpleButton]} onPress={() => router.push('Posts')}>
          <Text style={styles.buttonText}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.blueButton]} onPress={() => router.push('MyPriceCard')}>
          <Text style={styles.buttonText}>Pricing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.greenButton]} onPress={() => router.push('LoginPage')}>
          <Text style={styles.buttonText}>LoginPage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.greenButton]} onPress={() => router.push('Call')}>
          <Text style={styles.buttonText}>Call</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 10
  },
  blueButton: {
    backgroundColor: '#007bff'
  },
  greenButton: {
    backgroundColor: '#28a745'
  },
  purpleButton: {
    backgroundColor: '#6f42c1'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
