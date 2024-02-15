import React from 'react'
import { View } from 'react-native'
import About from './comp/About'
import Contact from './comp/Contact'
import MyPriceCard from './comp/MyPriceCard'
import { Text } from '@rneui/themed'

export default function App() {
  return (
    <View style={{ marginTop: 30 }}>
      <Text h3>Haysky</Text>
      {/* <MyPriceCard /> */}
      {/* <About /> */}
      <Contact />
    </View>
  )
}
