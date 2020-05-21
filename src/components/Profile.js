import React, {Component, useEffect, useState} from 'react';
import {AuthContext} from '../../context';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import {Button} from 'react-native-paper';
import jwtDecode from 'jwt-decode';

export function Profile() {
  const {signOut} = React.useContext(AuthContext);
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    console.log('use effect work');
    getDisplayName();
  }, []);

  const getDisplayName = async () => {
    const token = await AsyncStorage.getItem('token');
    setDisplayName(jwtDecode(token).displayName);
    console.log(displayName);
  }
  return (
    <View style={styles.container}>
      <Icon name="account-circle" color="#ffffff" size={150} />
      <Text style={styles.logged}>You are logged in as:</Text>
      <Text style={styles.displayName}>{displayName}</Text>
      <Button
        style={styles.loginBtn}
        mode="contained"
        onPress={() => signOut()}
        title="Login">
        Sign out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
    paddingTop: 30,
  },
  signOutBtn: {
    width: 250,
    borderRadius: 10,
    borderColor: '#ffffff',
    borderWidth: 2,
    marginTop: 80,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  white: {
    color: '#ffffff',
    fontSize: 25,
  },
  loginBtn: {
    width: '85%',
    height: 60,
    justifyContent: 'center',
    borderRadius: 40,
    position: 'absolute',
    bottom: 30,
  },
  displayName: {
    fontSize: 20,
    paddingTop: 20,
  },
  logged: {
    fontSize: 16,
  }
});
