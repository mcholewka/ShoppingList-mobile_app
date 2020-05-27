import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TextInput,
  Alert,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Button} from 'react-native-paper';
import config from '../../config/config.json';

class AddProduct extends Component {
  basketId = {basketId: this.props.route.params.basketId};
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  addNewUser = async () => {
    const {basketId} = this.basketId;
    var token = await AsyncStorage.getItem('token');
    var url = config.backendUrl + 'users/basket/' + basketId;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': token,
      },
      body: JSON.stringify({
        email: this.state.email,
      }),
    })
      .then(response => {
        if (response.status === 400) {
          return response.json();
        } else {
          return false;
        }
      })
      .then(response => {
        if (response !== false) {
          Alert.alert(response.message);
        }
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Add new user to basket</Text>

        <View style={styles.inputContainer}>
          <Icon style={styles.inputLogo} name="person" color="#111111" />
          <TextInput
            style={styles.inputText}
            placeholder="User email"
            onChangeText={email => this.setState({email})}
            value={this.state.email}
          />
        </View>

        <Button
          style={styles.loginBtn}
          mode="contained"
          onPress={() => this.addNewUser()}
          title="Login">
          Add User
        </Button>
      </View>
    );
  }
}

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 18,
    paddingBottom: 30,
  },
  input: {
    width: '80%',
  },
  button: {
    marginTop: 30,
    width: '80%',
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
