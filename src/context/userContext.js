import {View, Text} from 'react-native';
import React, {createContext, useContext, useReducer} from 'react';
import {SIGN_IN} from './actions';
import userReducer from './userReducer';

const initialState = {
  loggedIn: false,
  theme: 'light',
};
const UserContext = createContext();

const UserContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const signIn = username => {
    console.log('signIn triggered from context');
    dispatch({
      type: SIGN_IN,
      payload: {
        username,
      },
    });
  };
  const signOut = () => {
    console.log('signout');
  };
  return (
    <UserContext.Provider value={{...state, signOut, signIn}}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  console.log('from useUserContext');
  const contextData = useContext(UserContext);
  console.log({contextData});
  return contextData;
};

export {UserContextProvider, useUserContext, UserContext};
