import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    AsyncStorage.getItem('loggedUser')
      .then(data => {
        if (data !== null) {
          navigation.replace('Home')
        }else navigation.replace('Login')
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})