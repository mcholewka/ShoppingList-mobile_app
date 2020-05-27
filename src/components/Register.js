import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import {AuthContext} from '../../context';
import {Button} from 'react-native-paper';

export const Register = ({navigation}) => {
  const {signUp} = React.useContext(AuthContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [displayName, setDisplayName] = React.useState('');

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Icon name="shopping-cart" color="#ffffff" size={50} />
        <Text style={styles.logo}> Shopping list </Text>
      </View>
      <View style={styles.inputContainer}>
        <Icon style={styles.inputLogo} name="person" color="#111111" />
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon style={styles.inputLogo} name="face" color="#111111" />
        <TextInput
          style={styles.inputText}
          placeholder="Name"
          onChangeText={setDisplayName}
          value={displayName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon style={styles.inputLogo} name="lock" color="#111111" />
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          secureTextEntry
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon
          style={styles.inputLogo}
          name="enhanced-encryption"
          color="#111111"
        />
        <TextInput
          style={styles.inputText}
          placeholder="Confirm Password"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
      </View>
      <Button
        style={styles.loginBtn}
        mode="contained"
        onPress={() => signUp({email, displayName, password, confirmPassword})}
        title="Register">
        Register
      </Button>
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
    width: '80%',
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: '#ffffff',
    borderWidth: 2,
    marginTop: 20,
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
  loginBtn: {
    width: '85%',
    height: 60,
    justifyContent: 'center',
    borderRadius: 40,
  },
});
