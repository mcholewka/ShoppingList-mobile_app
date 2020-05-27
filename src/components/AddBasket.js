import React, {Component} from 'react';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';
import {TextInput} from 'react-native';
import {Icon} from 'react-native-elements';
import {Button} from 'react-native-paper';
import config from '../config/config.json';

class AddBasket extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  addNewList = async () => {
    var token = await AsyncStorage.getItem('token');
    fetch(config.backendUrl + 'buckets', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': token,
      },
      body: JSON.stringify({
        bucketName: this.state.text,
      }),
    })
      .then(response => response.json())
      .then(res => {
        const {navigation} = this.props;
        navigation.goBack();
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Add new shopping list</Text>

        <View style={styles.inputContainer}>
          <Icon
            style={styles.inputLogo}
            name="shopping-basket"
            color="#111111"
          />
          <TextInput
            style={styles.inputText}
            placeholder="List name"
            onChangeText={text => this.setState({text})}
            value={this.state.text}
          />
        </View>

        <Button
          style={styles.loginBtn}
          mode="contained"
          onPress={() => this.addNewList()}
          title="Login">
          Add List
        </Button>
      </View>
    );
  }
}

export default AddBasket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 18,
    paddingTop: 30,
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
