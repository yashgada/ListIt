import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomButton = ({onPress,text,type="signIn"}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container,styles[type]]}>
      <Text style={[styles.text,styles[type]]}>{text}</Text>
    </Pressable>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    container:{
        width:'100%',
        padding:15,
        marginVertical:5,
        borderRadius:5,
        alignItems:'center',
    },
    text:{
        color:'white',
        // Here, somehow setting the button's text bold makes it omit the last char
        fontWeight:'bold',
    },
    signIn:{
        backgroundColor:'#3b71f3',
    },
    signUp:{
        color:'#3b71f3'
    }
})