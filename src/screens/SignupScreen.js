import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {Formik} from 'formik';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import logo from '../../assets/logo.png';
import {create} from 'apisauce';

const SignupScreen = () => {
  const {height: windowHeight} = useWindowDimensions();
  const api = create({
    baseURL: 'http://192.168.1.36:5000/api/v1/signup',
  });
  const onSubmit = async values => {
    console.warn({submission: values});
    const result = await api.get('/');
    console.log({result: result.originalError.stack});
  };
  return (
    <View style={styles.root}>
      <Formik
        initialValues={{firstName: '', lastName: '', email: '', password: ''}}
        onSubmit={onSubmit}>
        {({handleChange, handleSubmit, values}) => (
          <>
            <Image
              source={logo}
              style={[styles.logo, {height: windowHeight * 0.3}]}
              resizeMode="contain"
            />
            <CustomInput
              placeholder="First name"
              value={values.firstName}
              setValue={handleChange('firstName')}></CustomInput>
            <CustomInput
              placeholder="Last name"
              value={values.lastName}
              setValue={handleChange('lastName')}></CustomInput>
            <CustomInput
              placeholder="Email"
              value={values.email}
              setValue={handleChange('email')}></CustomInput>
            <CustomInput
              placeholder="Password"
              value={values.password}
              setValue={handleChange('password')}
              secureTextEntry></CustomInput>
            <CustomButton text="Sign Up" onPress={handleSubmit}></CustomButton>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 20,
    alignItems: 'center',
  },
  logo: {},
});
