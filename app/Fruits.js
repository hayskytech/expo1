import React, { useEffect, useState } from 'react'
import { db } from '../firebaseConfig'
import { onValue, push, ref, set } from 'firebase/database'
import { FlatList } from 'react-native'
import { Button, Icon, Input, ListItem, Text } from '@rneui/themed'

export default function Fruits() {
  const [list, setList] = useState([])
  const [text, setText] = useState('')
  const [editKey, seteditKey] = useState(null)

  const myRef = ref(db, 'fruits')

  useEffect(() => {
    onValue(myRef, (snapshot) => {
      const res = snapshot.val()
      setList(res);
    })
  }, [])

  function renderItem({ item }) {
    return (
      <ListItem containerStyle={{ padding: 10 }}>
        <Icon name='arrow-circle-right' />
        <ListItem.Content>
          <ListItem.Title>{item[1]}</ListItem.Title>
        </ListItem.Content>
        <Icon name='edit' color='blue' onPress={() => ediItem(item[0])} />
        <Icon name='delete-outline' color='red' onPress={() => deleteItem(item[0])} />
      </ListItem>
    )
  }
  function submitItem() {
    // console.log(text);
    if (editKey) {
      // we should update
      const saveRef = ref(db, 'fruits/' + editKey)
      set(saveRef, text)
      seteditKey(null)
    } else {
      // we should add new
      push(myRef, text)
    }
    setText('')
  }
  function deleteItem(delKey) {
    if (!delKey) {
      return
    }
    const delRef = ref(db, 'fruits/' + delKey)
    set(delRef, null)
  }
  function ediItem(key) {
    seteditKey(key)
    setText(list[key])
  }
  return (
    <>
      <Input
        value={text}
        onChangeText={d => setText(d)}
        placeholder='Enter Fruit Name'
        onSubmitEditing={submitItem}
        leftIcon={<Icon name='arrow-forward' />}
        // rightIcon={<Icon name='check-circle' onPress={submitItem} />}
        rightIcon={<Button containerStyle={{ display: 'flex', alignSelf: 'center' }} onPress={submitItem}>{editKey ? "Save" : "Add"}</Button>}
      />


      {/* {list.map((item) => <Text></Text>)} */}
      <FlatList
        data={Object.entries(list)}
        renderItem={renderItem} />

    </>
  )
}
