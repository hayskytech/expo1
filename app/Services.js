import { Text } from '@rneui/themed'
import { Stack } from 'expo-router'
import React from 'react'

export default function Services() {
  return (
    <>
      <Stack.Screen options={{ title: 'My Services' }} />
      <Text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio, harum. Quos nisi sint esse, molestias consequatur commodi accusantium. Et omnis officia ea accusantium tempora! Accusamus molestiae doloribus alias expedita excepturi.</Text>
    </>
  )
}
