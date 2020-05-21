import * as React from 'react';
import {AsyncStorage, Alert, Button, View, StyleSheet} from 'react-native';
import {Login, Splash} from './src/components/Login';
import Home from './src/components/Home';
import {Register} from './src/components/Register';
import {Profile} from './src/components/Profile';
import ProductList from './src/components/ProductList';
import AddBasket from './src/components/AddBasket';
import AddProduct from './src/components/ProductListOption/AddProduct';
import AddUserToBasket from './src/components/ProductListOption/AddUserToBasket';
import ProductListSettings from './src/components/ProductListOption/ProductListSettings';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {AuthContext} from './context';
import {Icon} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
        backgroundColor: '#2B2B2B',
      },
      headerTintColor: '#fff',
    }}>
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen
      name="AddBasket"
      component={AddBasket}
      options={{title: 'Add new basket'}}
    />
    <HomeStack.Screen
      name="ProductList"
      component={ProductList}
      options={{title: 'Product list'}}
    />
    <HomeStack.Screen
      name="AddProduct"
      component={AddProduct}
      options={{title: 'Add new product'}}
    />
    <HomeStack.Screen
      name="AddUserToBasket"
      component={AddUserToBasket}
      options={{title: 'Add new user to basket'}}
    />
    <HomeStack.Screen
      name="ProductListSettings"
      component={ProductListSettings}
      options={{title: 'Product list settings'}}
    />
  </HomeStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#2B2B2B',
      },
      headerTintColor: '#fff',
    }}>
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const TabsScreen = () => (
  <Tabs.Navigator
    tabBarOptions={{
      activeTintColor: '#2FE6B1',
      inactiveTintColor: 'gray',
      backgroundColor: '#2B2B2B',
    }}>
    <Tabs.Screen
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color, size}) => (
          <Icon name="home" color={color} size={size} />
        ),
      }}
      name="Home"
      component={HomeStackScreen}
    />
    <Tabs.Screen
      options={{
        tabBarLabel: 'User',
        tabBarIcon: ({color, size}) => (
          <Icon name="person" color={color} size={size} />
        ),
      }}
      name="Profile"
      component={ProfileStackScreen}
    />
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
              console.log(res.token);
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

const styles = StyleSheet.create({
  touchable: {
    marginRight: 10,
  },
});
