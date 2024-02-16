import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text } from '@rneui/themed'
import { onValue, ref } from "firebase/database";
import { db } from './firebaseConfig'



export default function App() {
  const [text, setText] = useState('')

  const starCountRef = ref(db, 'testdata');
  useEffect(() => {
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setText(data);
    });
  }, [])

  return (
    <View style={{ marginTop: 30 }}>
      <Text h3>{text}</Text>
    </View>
  )
}
