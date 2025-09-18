import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const ListItem = ({ title, subtitle, onPress }) => {
  return (
    <TouchableOpacity style={styles.listItem} onPress={onPress}>
      <View style={styles.listItemContent}>
        <Text style={styles.listItemTitle}>{title}</Text>
        <Text style={styles.listItemSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About Us</Text>
      <Text style={styles.description}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic perferendis quaerat at ab suscipit fugit quisquam. Porro exercitationem nihil temporibus non iure alias, placeat quisquam, rem sed repellendus, voluptates sequi?</Text>

      <Text style={styles.subHeading}>Students</Text>
      <ListItem
        title="John Doe"
        subtitle="CEO, Example.com"
        onPress={() => console.log('John Doe pressed')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 15
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  },
  listItem: {
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 5,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  listItemContent: {
    flex: 1
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  listItemSubtitle: {
    fontSize: 14,
    color: '#666'
  }
});
