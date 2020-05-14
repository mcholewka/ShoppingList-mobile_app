import React, {Component} from 'react';
import {AuthContext} from '../../context';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import {Button} from 'react-native-paper';

export const Profile = () => {
  const {signOut} = React.useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Icon name="account-circle" color="#ffffff" size={150} />
      {/* <TouchableOpacity style={styles.signOutBtn} onPress={() => signOut()}>
        <Text style={styles.white}>Sign out</Text>
      </TouchableOpacity> */}

      <Button
        style={styles.loginBtn}
        mode="contained"
        onPress={() => signOut()}
        title="Login">
        Sign out
      </Button>
    </View>
  );
};

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
});
