import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from '../components/TaskItem';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import {SelectList} from 'react-native-dropdown-select-list';

const HomeScreen = ({navigation}) => {
  const [currentUser, setCurrentUser] = useState('');
  const [list, setList] = useState([
    {title: 'Add a task like such', timestamp: 'Time stamps appear here',category:{colour:'#aaa',name:'Dummy'}},
  ]);
  const [input, setInput] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
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
          AsyncStorage.getItem(`${value}list`)
            .then(list => {
              if (list !== null) {
                setList(JSON.parse(list));
              }
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));

    AsyncStorage.getItem('categories')
      .then(categories => {
        if (categories === null) return;
        setCategories(JSON.parse(categories));
      })
      .catch(err => console.log({err}));
  };
  const logOut = () => {
    AsyncStorage.removeItem('loggedUser');
    AsyncStorage.clear();
    navigation.replace('Login');
  };
  const addTask = () => {
    if (!input.trim().length) return;
    const inputTime = new Date().toLocaleString();
    const key = new Date().getTime();
    const newList = [
      ...list,
      {
        title: input,
        timestamp: inputTime,
        key,
        category: categories.filter(cat => cat.name === category)[0],
      },
    ];
    // console.log({newList});
    console.log(newList.map(item=>item.category));
    AsyncStorage.setItem(currentUser + 'list', JSON.stringify(newList)).catch(
      err => console.log(err),
    );
    setList(
      list => newList
      // [...list, {title: input, timestamp: inputTime, key,category:{}}]
    );

    setInput('');
  };
  const removeTask = key => {
    // console.log('Remove triggered');
    // console.log({key});
    const newList = list.filter(task => task.key !== key);
    // console.log({newList});
    AsyncStorage.setItem(currentUser + 'list', JSON.stringify(newList)).then(
      () => setList(newList),
    );
  };
  const onPressEdit = id => {
    // This function navigates to the edit screen and sends the text value of the task and task id to the screen.
    navigation.navigate('Edit', {id});
  };
  const renderTask = ({item}) => {
    // console.log({item});
    // console.log(typeof item.key);
    console.log({item});
    console.log({cat : item.category});
    return (
      <TaskItem
        title={item.title}
        timestamp={item.timestamp}
        id={item.key}
        removeTask={removeTask}
        onPressEdit={onPressEdit}
        category={item.category.colour}></TaskItem>
    );
  };
  // const keyExtractor = (_, key) => key;
  useEffect(() => {
    init();
  }, []);

  return (
    <View style={styles.root}>
      <View>
        <View style={styles.inputForm}>
          <View style={styles.inputBox}>
            <CustomInput
              placeholder="Input here"
              value={input}
              setValue={setInput}></CustomInput>
          </View>
          <View style={styles.addButton}>
            <CustomButton onPress={addTask} text="Add" />
          </View>
        </View>
        <SelectList
          data={categories.map((el, index) => ({id: index, value: el.name}))}
          setSelected={setCategory}></SelectList>
      </View>
      <CustomButton
        style={styles.button}
        text="Sign Out"
        onPress={logOut}></CustomButton>
      <FlatList
        ListEmptyComponent={
          <TaskItem
            onPressEdit={() => null}
            title="This is how your task will appear"
            timestamp="This will be the timestamp"
          />
        }
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
    padding: 20,
    backgroundColor: '#f9fbfc',
    alignItems: 'center',
  },
  inputForm: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    margin: 10,
    // backgroundColor: 'red',
    borderWidth: 1,
    borderColor: '#EC8B5E',
    padding: 10,
    marginVertical: 20,
  },
  addButton: {
    marginHorizontal: 10,
  },
  flatlist: {
    width: '100%',
    alignSelf: 'center',
    // maxWidth:768
  },
  inputBox: {
    flex: 1,
  },
});
