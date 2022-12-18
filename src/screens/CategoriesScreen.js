// Screen to create new categories
import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FlatList} from 'react-native-gesture-handler';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const CategoriesScreen = ({navigation}) => {
  const [categories, setCategories] = useState([
    {name: 'Cat1', colour: '#ffaa33'},
  ]);
  const [input, setInput] = useState('');
  const [colour, setColour] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('categories')
      .then(categories => {
        if (categories === null) return;
        setCategories(JSON.parse(categories));
      })
      .catch(err => console.log({err}));
  }, []);

  const renderCategory = ({item}) => {
    return (
      <View style={styles.categoryCard}>
        <Text>{item.name}</Text>
        {/* <View style={}> */}
        {/* <Text>{item.colour}</Text> */}
        <View
          style={[
            styles.categoryColourSample,
            {backgroundColor: item.colour},
          ]}></View>
        {/* </View> */}
      </View>
    );
  };

  const onPressCategorySubmit = () => {
    const newCategory = {name: input, colour: '#' + colour.toLowerCase()};
    const newCategories = [...categories, newCategory];
    AsyncStorage.setItem('categories', JSON.stringify(newCategories)).then(
      () => {
        setCategories(newCategories), setInput('');
        setColour('');
      },
    );
  };

  return (
    <View>
      <Text>Here are the available Categories:</Text>
      <View style={styles.categoryInputBox}>
        <View style={styles.inputForm}>
          <View style={styles.inputBox}>
            <CustomInput
              placeholder="New Category name here"
              value={input}
              setValue={setInput}></CustomInput>
          </View>
          <View style={styles.addButton}>
            <CustomButton onPress={onPressCategorySubmit} text="Add" />
          </View>
        </View>
        <TextInput
          placeholder="Colour here"
          onChangeText={text => setColour(text)}>
          {colour}
        </TextInput>
      </View>
      <FlatList
        contentContainerStyle={styles.flatlist}
        data={categories}
        renderItem={renderCategory}
      />
    </View>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  categoryCard: {
    width: '50%',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryColourSample: {
    width: 20,
    height: 20,
  },
  flatlist: {
    borderWidth: 2,
    margin: 10,
    alignItems: 'center',
  },
  categoryInputBox: {
    width: 'auto',
    marginHorizontal: 10,
    maxWidth: '100%',
    borderWidth: 1,
    borderColor: '#EC8B5E',
  },
  inputForm: {
    borderWidth: 1,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    // margin: 10,
    // backgroundColor: 'red',
    padding: 10,
    marginVertical: 10,
  },
  inputBox: {
    flex: 1,
  },
  addButton: {
    marginHorizontal: 10,
  },
});
