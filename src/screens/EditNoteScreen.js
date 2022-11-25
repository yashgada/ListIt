import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditNoteScreen = ({route, navigation}) => {
  const [input, setInput] = useState('');
  const [currentUser, setCurrentUser] = useState(null)
  const [list, setList] = useState([])
  // console.log({route});
  const {id} = route.params;

  const init = () => {
    // Todo these seem to not work
    // await getCurrentUser();
    // getList();

    AsyncStorage.getItem('loggedUser')
      .then(value => {
        if (value !== null) {
          setCurrentUser(value);
          AsyncStorage.getItem(`${value}list`)
            .then(list => {
              if (list !== null) {
                // console.log('reached');
                list = JSON.parse(list)
                setList(list)
                const currentTask = list.filter(task=>task.key===id)[0]
                // console.log({currentTask});
                setInput(currentTask.title)
                // setList(JSON.parse(list));
              }
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  };

  const onChangeText = (text)=>{
    setInput(text)
  }

  const onPressSubmit = ()=>{
    const newList = list.map(task=>{
      if(task.key!==id) return task;
      else{
        return{...task,title:input}
      }
    })
    AsyncStorage.setItem(currentUser+'list',JSON.stringify(newList)).then(()=>navigation.replace('Home'))
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <View>
      <TextInput placeholder='Enter Task here' onChangeText={onChangeText}>{input}</TextInput>
      <Text>{id}</Text>
      <Button title='Save' onPress={onPressSubmit}></Button>
    </View>
  );
};

export default EditNoteScreen;

const styles = StyleSheet.create({});
