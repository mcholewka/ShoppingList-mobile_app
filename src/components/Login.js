/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import {AuthContext} from '../../context';
import { Button } from 'react-native-paper';

export const Login = ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
      <Icon
          name="shopping-cart" color="#ffffff"size={50}
        />
      <Text style={styles.logo}> Shopping list </Text>
      </View>

      <View style={styles.inputContainer}>
        <Icon style={styles.inputLogo} name="person" color="#111111" />
        <TextInput style={styles.inputText} placeholder="Email" onChangeText = {setEmail} value={email} />
      </View>

      <View style={styles.inputContainer}>
        <Icon style={styles.inputLogo} name="lock" color="#111111" />
        <TextInput style={styles.inputText}  placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password} />
      </View>

      <Button style={styles.loginBtn} mode="contained" onPress={() => signIn({email, password})} title="Login" >Login</Button>

      <View style={styles.btnContainer}>
        
      <TouchableOpacity style={styles.userBtn1} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.text}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.userBtn2} onPress={() => signIn({email, password})}>
          <Text style={styles.text}>Forgot password?</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

export const Splash = () => (
  <View>
    <Text>Loading...</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2B2B2B',
  },
  logo: {
    fontSize: 30,
    paddingBottom: 30,
    color: '#ffffff',
  },
  userBtn1: {
    width: '47%',
    alignItems: 'flex-start',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  userBtn2: {
    width: '47%',
    alignItems: 'flex-end',
    height: 50,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  btnContainer: {
    fontSize: 18,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  text: {
    color: '#ffffff',
    opacity: 0.8,
    fontSize: 15,
  },
  logoContainer: {
    flexDirection: 'row',
    paddingBottom: 40,
  },
  loginBtn: {
    width: '85%',
    height: 60,
    justifyContent: 'center',
    borderRadius: 40,
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    width: '85%',
    flexDirection: 'row',
    borderRadius: 40,
    height: 60,
    marginBottom: 25,
  },
  inputLogo: {
    paddingTop: 15,
    paddingLeft: 15,
  },
  inputText: {
    paddingLeft: 5,
    flex: 1,
  },
});
