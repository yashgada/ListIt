import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from './HomeScreen'
import CategoriesScreen from './CategoriesScreen'
import FilterScreen from './FilterScreen'

const Drawer = createDrawerNavigator()
const LoggedIn = ({navigation}) => {
  return (
    <Drawer.Navigator>
    <Drawer.Screen name='LoggedInHome' component={HomeScreen}></Drawer.Screen>
    <Drawer.Screen name='Categories' component={CategoriesScreen}></Drawer.Screen>
    <Drawer.Screen name='Filter' component={FilterScreen}></Drawer.Screen>
    </Drawer.Navigator>
  )
}

export default LoggedIn

const styles = StyleSheet.create({})