// import React, {Component} from 'react';
// import {
//   View,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
// } from 'react-native';

// export default class Register extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//       displayName: '',
//       password: '',
//       confirmPassword: '',
//     };
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.logo}> Register </Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           onChangeText={email => this.setState({email})}
//           value={this.state.email}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Name"
//           onChangeText={displayName => this.setState({displayName})}
//           value={this.state.displayName}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           secureTextEntry
//           onChangeText={password => this.setState({password})}
//           value={this.state.password}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Confirm password"
//           secureTextEntry
//           onChangeText={confirmPassword => this.setState({confirmPassword})}
//           value={this.state.confirmPassword}
//         />
//         <TouchableOpacity style={styles.userBtn} onPress={this._register}>
//           <Text>Register</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   _register = () => {
//     fetch('http://192.168.0.105:3000/api/users/register', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email: this.state.email,
//         displayName: this.state.displayName,
//         password: this.state.password,
//       }),
//     });
//   };
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#4287f5',
//   },
//   logo: {
//     fontSize: 50,
//     paddingBottom: 30,
//     color: '#ffffff',
//   },
//   input: {
//     width: '90%',
//     backgroundColor: '#ffffff',
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   userBtn: {
//     backgroundColor: '#FFD700',
//     alignItems: 'center',
//     height: 50,
//     justifyContent: 'center',
//     borderRadius: 8,
//     marginTop: 20,
//     width: '80%',
//   },
//   btnContainer: {
//     fontSize: 18,
//     width: '90%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingTop: 20,
//   },
// });

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {AuthContext} from '../../context';

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
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={setDisplayName}
        value={displayName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm password"
        secureTextEntry
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />
      <TouchableOpacity
        style={styles.userBtn}
        onPress={() => signUp({email, displayName, password, confirmPassword})}>
        <Text style={styles.text}>Register</Text>
      </TouchableOpacity>
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
});
