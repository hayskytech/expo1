import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { db } from '../others/firebaseConfig'
import { FlatList, Text } from 'react-native'

export default function Topics() {
  const [topics, setTopics] = useState([])
  const myRef = ref(db, 'data/topics')
  useEffect(() => {

    onValue(myRef, (snapshot) => {
      const res = snapshot.val()
      setTopics(res);
    })

  }, [])

  return (
    <>
      <FlatList
        data={topics}
        renderItem={({ item }) => <Text>{item}</Text>}
      />

    </>
  )
}
