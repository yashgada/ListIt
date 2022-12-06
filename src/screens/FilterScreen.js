import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SelectList} from 'react-native-dropdown-select-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from '../components/TaskItem';
import CustomInput from '../components/CustomInput';

const FilterScreen = ({navigation}) => {
  const [currentUser, setCurrentUser] = useState('');
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('Search');
  const [searchInput, setSearchInput] = useState('');
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [selectedCategory, setSelectedCategory] = useState();

  //   Here, why not maintain a separate filteredList state variable? What are the advantages and disadvantages?
  const filteredTasks = list.filter(item => {
    if(selectedFilter === 'Search'){
        return item.title.toLowerCase().includes(searchInput.toLowerCase());
    }else if(selectedFilter=== 'Categories'){
        if(!selectedCategory) return true
        return item.category.name === selectedCategory;
    }else{console.log("We have a problem"); return true}
  });

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
                list = JSON.parse(list);
                setList(list);
                setFilteredList(list);
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

  const handleSearchInput = text => {
    console.log({text});
    setSearchInput(text);
    // text = text.toLowerCase();
    // setFilteredList = list.filter(item=>item.title)
  };

  const handleFilterSelect = () => {
    // console.log('handleSelect triggered in FilterScreen');
    setSearchInput('');
    setFromDate(null);
    setToDate(null);
    setSelectedCategory(null);
  };

  const handleCategorySelect = ()=>{
    // setFilteredTasks(list.filter(item=>item.category.name === selectedCategory))
  }

  const renderTask = ({item}) => {
    // console.log({item});
    // console.log(typeof item.key);
    // console.log({cat : item.category});
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

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {}, [selectedFilter]);

  return (
    <View style={styles.root}>
      <View style={styles.filterView}>
        <Text>Select the type of filter please: </Text>
        <SelectList
          data={['Categories', 'Date range', 'Search']}
          setSelected={setSelectedFilter}
          search={false}
          onSelect={handleFilterSelect}
        />
        <Text>selectedFilter: {selectedFilter}</Text>
        <View style={styles.filterInput}>
          {selectedFilter === 'Categories' ? (
            <>
              <Text>Selected category is {selectedCategory}</Text>
              <SelectList
              data={categories.map(cat=>cat.name)}
              setSelected={setSelectedCategory}
              search={false}
              onSelect={handleCategorySelect}
              ></SelectList>
            </>
          ) : selectedFilter === 'Date range' ? (
            <Text>Date range filter input will be displayed</Text>
          ) : (
            // <Text>Search input displayed</Text>
            <TextInput
              placeholder="Input here"
              value={searchInput}
              onChangeText={handleSearchInput}
              //   setValue={setInput}
            />
          )}
        </View>
      </View>
      <View style={styles.resultsView}>
        {/* <Text>{JSON.stringify(list)}</Text> */}
        <Text>And {JSON.stringify(filteredTasks)}</Text>
        {/* <FlatList data={list} renderItem={renderItem} ></FlatList> */}
        <FlatList
          ListEmptyComponent={
            <TaskItem
              onPressEdit={() => null}
              title="This is how your task will appear"
              timestamp="This will be the timestamp"
            />
          }
          style={styles.flatlist}
          data={filteredTasks}
          //   data={filteredList}
          renderItem={renderTask}
          // keyExtractor={keyExtractor}
        />
      </View>
    </View>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
    root:{
        flexDirection:'column',
        height:'100%',
        borderBottomColor:'red',
    },
  filterView: {},
  filterInput: {},
  resultsView: {
    flex:1,
    borderWidth:2,
    paddingHorizontal:20,
  },
  flatlist: {
    width: '100%',
    alignSelf: 'center',
    // maxWidth:768
  },
});
