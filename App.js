import * as React from 'react';
import {AsyncStorage, Alert} from 'react-native';
import {Login, Splash} from './src/components/Login';
import Home from './src/components/Home';
import {Register} from './src/components/Register';
import {Profile} from './src/components/Profile';
import ProductList from './src/components/ProductList';
import AddBasket from './src/components/AddBasket';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {AuthContext} from './context';

const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{title: 'Sign In'}}
    />
    <AuthStack.Screen
      name="Register"
      component={Register}
      options={{title: 'Create Account'}}
    />
  </AuthStack.Navigator>
);

const Tabs = createBottomTabNavigator();
const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#275FC7',
      },
    }}>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="AddBasket" component={AddBasket} />
    <HomeStack.Screen name="ProductList" component={ProductList} />
  </HomeStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const TabsScreen = () => (
  <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeStackScreen} />
    <Tabs.Screen name="Profile" component={ProfileStackScreen} />
  </Tabs.Navigator>
);

const RootStack = createStackNavigator();
const RootStackScreen = ({userToken}) => (
  <RootStack.Navigator headerMode="none">
    {userToken ? (
      <RootStack.Screen
        name="App"
        component={TabsScreen}
        options={{
          animationEnabled: false,
        }}
      />
    ) : (
      <RootStack.Screen
        name="Auth"
        component={AuthStackScreen}
        options={{
          animationEnabled: false,
        }}
      />
    )}
  </RootStack.Navigator>
);

export default () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => {
    return {
      signIn: async data => {
        setIsLoading(false);
        fetch('http://192.168.0.105:3000/api/users/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
        })
          .then(response => response.json())
          .then(res => {
            if (res.token == null) {
              Alert.alert(res.message);
            } else {
              AsyncStorage.setItem('token', res.token);
              setUserToken(res.token);
            }
          });
      },
      signUp: async data => {
        setIsLoading(false);
        fetch('http://192.168.0.105:3000/api/users/register', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            displayName: data.displayName,
            password: data.password,
          }),
        }).then(Alert.alert('Registered succesfully, now you can logged in!'));
        setUserToken(null);
      },
      signOut: () => {
        setIsLoading(false);
        AsyncStorage.removeItem('token');
        setUserToken(null);
      },
    };
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
