import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
// here
import {
  SplashScreen,
  HomeScreen,
  EditNoteScreen,
  LoginScreen,
  SignupScreen,
} from './screens';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {UserContextProvider, UserContext, useUserContext} from './context/userContext';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const {loggedIn} = useUserContext();
  // const context = useContext(UserContext)
  // console.log({context});


  useEffect(() => {
    AsyncStorage.getItem('loggedUser')
      .then(data => {
        setIsLoading(false);
        if (data !== null) {
          setIsLoggedIn(true);
        }
      })
      .catch(err => console.log(err));
  }, []);

  if (isLoading === true) return <SplashScreen />;
  return (
    // <UserContext.Provider value={{signIn:()=>{console.log('Signin')}}}>
    <UserContextProvider>
      <NavigationContainer styles={styles.root}>
        <Stack.Navigator screenOptions={{headerShown:false}}>
        {isLoggedIn ? (<>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Edit" component={EditNoteScreen} />
        </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
          </Stack.Navigator>
      </NavigationContainer>
     </UserContextProvider>
  );
};

const styles = StyleSheet.create({
  root:{
    // backgroundColor:'#f9fbfc',
    backgroundColor:'#fc3'
  }
});

export default App;
