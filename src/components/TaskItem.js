import {Button, Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomButton from './CustomButton';

const TaskItem = ({title, timestamp,id, removeTask, onPressEdit,category='#000'}) => {
    const onPress = ()=>{
      if(!removeTask) return;
        removeTask(id)
    }
    // console.log('from taskItem');
    // console.log(typeof(id));
    // console.log({removeTask});
  return (
    <View style={[styles.container, {elevation:2}]}>
      <View style={styles.data}>
        <Text style={[styles.text,{color:category}]}>{title}</Text>
        <Text>{timestamp}</Text>
      </View>
      <View style={styles.buttons}>
        <CustomButton
          text="Delete"
          onPress={onPress}
        ></CustomButton>
        <CustomButton  text="Editj" onPress={()=>{onPressEdit(id,title)}}></CustomButton>
      </View>
    </View>
  );
};

export default TaskItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    // width:'80%',
    // borderWidth: 1,
  },
  text: {
    color: '#EC8B5E',
    // fontWeight:'bold',
    fontSize: 24,
  },
  data: {
    flex:5,
    // borderWidth:10,
    // borderColor:'red'
  },
  buttons:{
    flex:2,
    // flexDirection:'row',
    // borderWidth:1,
  },
  button:{
    paddingHorizontal:5,
    marginHorizontal:5,
    marginRight:10,
    backgroundColor:'black'
  }
});
// const generateBoxShadowStyle = () => {
//   if (Platform.OS === 'ios') {
//     styles.boxShadow = {
//       shadowColor: '#000',
//       shadowOffset: {width: 0, height: 2},
//       shadowOpacity: 0.25,
//       shadowRadius: 3.84,
//     };
//   } else if (Platform.OS === 'android') {
//     styles.boxShadow = {
//       elevation: 1,
//     };
//   }
// };
// generateBoxShadowStyle();
