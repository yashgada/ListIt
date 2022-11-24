import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import {useContext, useState} from 'react';
import {UserContext, useUserContext} from '../context/userContext';
import SignupScreen from './SignupScreen';
import logo from '../../assets/logo.png';
import CustomInput from '../components/customInput';
import CustomButton from '../components/CustomButton';
import passwords from '../data';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const context = useContext(UserContext)
  console.log({context});
  // const {signIn} = useUserContext();
  // const {signIn} = useContext(UserContext)
  // console.log('From LoginScreen, data is');
  // console.log({data: signIn});
  // console.log("done");
  const {height: windowHeight} = useWindowDimensions();
  const onPressSignIn = () => {
    console.warn('Press signIn from LoginScreen');
    // signIn();
  };
  const onPressSignUp = () => {
    console.warn('Press signUp from LoginScreen');
    // signUp();
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollview}>
      <View style={styles.root}>
        <Image
          source={logo}
          style={[styles.logo, {height: windowHeight * 0.3}]}
          resizeMode="contain"
        />
        <CustomInput
          placeholder={'Username'}
          value={username}
          setValue={setUsername}></CustomInput>
        <CustomInput
          placeholder={'Password'}
          value={password}
          setValue={setPassword}
          secureTextEntry></CustomInput>
        <CustomButton onPress={onPressSignIn} text="Sign In"></CustomButton>
        <CustomButton
          onPress={onPressSignUp}
          text="Dont have an account yet? Sign Up!"
          type="signUp"></CustomButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f9fbfc',
    // height:'100%'
  },
  logo: {
    width: '70%',
    // height:'30%',
    maxWidth: 500,
    maxHeight: 200,
  },
  scrollview:{
    minHeight:'100%'
  }
});

export default LoginScreen;
