import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const CustomInput = ({placeholder,value, setValue, secureTextEntry, errorState=false}) => {
  return (
    <View style={[styles.container,{borderColor:errorState?'red':'white'}]}>
      <TextInput style={styles.input} placeholder={placeholder} autoCapitalize='none' value={value} onChangeText={setValue} secureTextEntry={secureTextEntry}></TextInput>
    </View>
  )
}

export default CustomInput

const styles = StyleSheet.create({
    container:{
        width:'100%',
        backgroundColor:'white',
        borderColor:'#e8e8e8',
        borderWidth:1,
        borderRadius:5,
        paddingHorizontal:10,
        marginVertical:5
    },
    input:{}
})