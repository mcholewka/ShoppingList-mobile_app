import React, {Component} from 'react';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';
import {TextInput} from 'react-native-paper';
import {Button} from 'react-native-paper';
class AddBasket extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  addNewList = async () => {
    var token = await AsyncStorage.getItem('token');
    fetch('http://192.168.0.105:3000/api/buckets', {
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
        console.log('added a list');
        const {navigation} = this.props;
        navigation.goBack();
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Add new shopping list:</Text>
        <TextInput
          style={styles.input}
          placeholder="List name:"
          onChangeText={text => this.setState({text})}
          value={this.state.text}
          mode="outlined"
        />
        <Button
          style={styles.button}
          mode="outlined"
          onPress={() => this.addNewList()}>
          Add list
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
  },
  input: {
    width: '80%',
  },
  button: {
    marginTop: 30,
    width: '80%',
  },
});
