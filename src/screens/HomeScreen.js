import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from '../components/TaskItem';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/customInput';

const HomeScreen = ({navigation}) => {
  const [currentUser, setCurrentUser] = useState('');
  const [list, setList] = useState([
    {title: 'Add a task like such', timestamp: 'Time stamps appear here'},
  ]);
  const [input, setInput] = useState('');
  const getCurrentUser = async () => {
    try {
      const username = await AsyncStorage.getItem('loggedUser');
      setCurrentUser(username);
      console.log('Current User set');
      console.log({username});
      console.log({currentUser});
    } catch (error) {
      console.log({error});
    }
  };
  const getList = async () => {
    try {
      const raw = await AsyncStorage.getItem(`${currentUser}list`);
      console.log({currentUser, raw});
      if (raw !== null) {
        setList(JSON.parse(raw));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const init = () => {
    // Todo these seem to not work
    // await getCurrentUser();
    // getList();

    AsyncStorage.getItem('loggedUser')
      .then(value => {
        if (value !== null) {
          setCurrentUser(value);
          AsyncStorage.getItem(`${value}list`).then(list => {
            if (list !== null) {
              setList(JSON.parse(list));
            }
          }).catch(err=>console.log(err));
        }
      })
      .catch(err => console.log(err));
  };
  const logOut = () => {
    AsyncStorage.removeItem('loggedUser');
    AsyncStorage.clear()
    navigation.replace('Login');
  };
  const addTask = async () => {
    if (!input.trim().length) return;
    const inputTime = new Date().toLocaleString();
    try {
      await AsyncStorage.setItem(
        currentUser + 'list',
        JSON.stringify([...list, {title: input, timestamp: inputTime, key:new Date.getTime()}]),
      );
      console.log(currentUser + 'list');
      console.log(`${currentUser}list`);
    } catch (error) {
      console.log({error});
    }
    setList(list => [...list, {title: input, timestamp: inputTime}]);

    setInput('');
  };
  const removeTask = (key)=>{
    const newList = list.filter(task=>task.key!==key)
    AsyncStorage.setItem(currentUser+'list',JSON.stringify(newList))
  }
  const renderTask = ({item}) => (
    <TaskItem title={item.title} timestamp={item.timestamp} key={item.key}></TaskItem>
  );
  // const keyExtractor = (_, key) => key;
  useEffect(() => {
    init();
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.inputForm}>
        <CustomInput
          placeholder="Input here"
          value={input}
          setValue={setInput}
          // style={styles.input}
        ></CustomInput>
        <Button title="Add" style={styles.button} onPress={addTask}></Button>
      </View>
      <CustomButton
        style={styles.button}
        text="Sign Out"
        onPress={logOut}></CustomButton>
      <FlatList
        style={styles.flatlist}
        data={list}
        renderItem={renderTask}
        // keyExtractor={keyExtractor}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 10,
    padding: 20,
    backgroundColor: '#f9fbfc',
    alignItems: 'center',
  },
  inputForm: {
    flexDirection: 'row',
    // width: '80%',
    justifyContent: 'space-between',
    margin: 10,
    // backgroundColor: 'red',
    borderWidth:1,
    borderColor: 'red',
    // padding: 10,
    // marginVertical: 10,
  },
  input: {},
  button: {
    paddingLeft: 10,
    marginLeft: 20,
    borderRadius: 10,
  },
  flatlist: {
    width: '100%',
    alignSelf: 'center',
    // maxWidth:768
  },
});
