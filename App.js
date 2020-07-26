import * as React from 'react';

import {useEffect} from 'react';

import RootStackScreen from "./screens/RootStackScreen";
import HomeStackScreen from "./screens/HomeStackScreen";
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native-animatable';

import { AuthContext } from './components/context';

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => ({
    signIn: () => {
      setUserToken("asdf");
      setIsLoading(false);
    },
    signOut: () => {
      setUserToken(null);
      setIsLoading(false);
    },
    signUp: () => {
      setUserToken("asdf");
      setIsLoading(false);
      }
    }));

  useEffect(() => {
    setTimeout(() => {
        setIsLoading(false);} , 1000);
    }, []);

  if (isLoading){
    return(
      <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size = 'large'/>
      </View>
    );
  }
  return(
    <AuthContext.Provider value = {authContext} >
      <NavigationContainer>
        {userToken != null ? (
          <HomeStackScreen/>
        ) :
        <RootStackScreen/>
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
