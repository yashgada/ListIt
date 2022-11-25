import {Button, Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const TaskItem = ({title, timestamp,id, removeTask, onPressEdit}) => {
    const onPress = ()=>{
        removeTask(id)
    }
    // console.log('from taskItem');
    // console.log(typeof(id));
    // console.log({removeTask});
  return (
    <View style={[styles.container, styles.boxShadow]}>
      <View style={styles.data}>
        <Text style={styles.text}>{title}</Text>
        <Text>{timestamp}</Text>
      </View>
      <View style={styles.buttons}>
        <Button style={styles.button}
          title="Delete"
          //    title={key}
          onPress={onPress}
        ></Button>
        <Button style={styles.button} title="Edit" onPress={()=>{onPressEdit(id,title)}}></Button>
      </View>
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    // width:'80%',
    // backgroundColor:'#',
    // borderWidth: 1,
  },
  text: {
    color: '#EC8B5E',
    // fontWeight:'bold',
    fontSize: 24,
  },
  data: {},
  buttons:{
    flexDirection:'row',
  },
  button:{
    paddingHorizontal:5,
    marginHorizontal:5,
    marginRight:10,
    backgroundColor:'black'
  }
});
const generateBoxShadowStyle = () => {
  if (Platform.OS === 'ios') {
    styles.boxShadow = {
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
    };
  } else if (Platform.OS === 'android') {
    styles.boxShadow = {
      elevation: 5,
    };
  }
};
generateBoxShadowStyle();
