import { Button, Icon, ListItem, Text } from '@rneui/themed'
import React from 'react'
import { View } from 'react-native'

export default function About() {
  return (
    <View>
      <Text style={{ fontSize: 25 }}>About Us</Text>
      <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic perferendis quaerat at ab suscipit fugit quisquam. Porro exercitationem nihil temporibus non iure alias, placeat quisquam, rem sed repellendus, voluptates sequi?</Text>

      <Text h3>Students</Text>
      <ListItem>
        <Icon name='home' />
        <ListItem.Content>
          <ListItem.Title>John Doe</ListItem.Title>
          <ListItem.Subtitle>CEO, Example.com</ListItem.Subtitle>
        </ListItem.Content>
        <Icon name='arrow-forward' />
      </ListItem>
    </View>
  )
}
