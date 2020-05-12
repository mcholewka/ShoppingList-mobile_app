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
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText = {setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.userBtn} onPress={() => signIn({email, password})}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.userBtn} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.text}>SignUp</Text>
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
  input: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginTop: 10,
  },
  userBtn: {
    width: '47%',
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: '#ffffff',
    borderWidth: 2,
  },
  btnContainer: {
    fontSize: 18,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  text: {
    color: '#ffffff',
  },
  logoContainer: {
    flexDirection: 'row',
    paddingBottom: 40,
  },
});
