import AsyncStorage from "@react-native-async-storage/async-storage";

export default userReducer = async (prev, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      console.log('Reducer sign triggered');
      console.log(`Sign in user ${action.payload.username}`);
      try {
        await AsyncStorage.setItem('loggedInUser',action.payload.username)
      } catch (err) {
        console.log("There is an error at Sign In while storing");
        console.log({err});
      }
      return {
        ...prev,
        isLoggedIn: true,
        username: action.payload.username
      };
  }
};