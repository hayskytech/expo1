import { Button, Text } from '@rneui/themed'
import { Stack, router } from 'expo-router'
import React from 'react'

export default function index() {
  return (
    <>
      <Stack.Screen options={{ title: 'Haysky Technologies' }} />
      <Text h3>Homepage</Text>
      <Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic, illum tempore nobis qui, sunt reiciendis quas nulla soluta eaque pariatur tenetur libero expedita accusamus vero corrupti consequatur enim optio deserunt.</Text>
      <Button color={`blue`} onPress={() => router.push('About')}>About</Button>
      <Button color={`green`} onPress={() => router.push('Services')}>Services</Button>
    </>
  )
}
