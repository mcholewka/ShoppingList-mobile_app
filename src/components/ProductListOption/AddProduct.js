import React, {Component} from 'react';
import {View, Text, StyleSheet, AsyncStorage, TextInput} from 'react-native';
import {Icon} from 'react-native-elements';
import {Button} from 'react-native-paper';
import config from '../../config/config.json';
class AddProduct extends Component {
  basketId = {basketId: this.props.route.params.basketId};
  constructor(props) {
    super(props);
    this.state = {
      productName: '',
      quantity: 1,
      description: '',
    };
  }

  addNewProduct = async () => {
    const {basketId} = this.basketId;
    var token = await AsyncStorage.getItem('token');
    var url = config.backendUrl + 'buckets/' + basketId + '/products';
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': token,
      },
      body: JSON.stringify({
        productName: this.state.productName,
        quantity: this.state.quantity,
        description: this.state.description,
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
        <Text style={styles.header}>Add new product</Text>

        <View style={styles.inputContainer}>
          <Icon
            style={styles.inputLogo}
            name="shopping-basket"
            color="#111111"
          />
          <TextInput
            style={styles.inputText}
            placeholder="Product name"
            onChangeText={productName => this.setState({productName})}
            value={this.state.productName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon
            style={styles.inputLogo}
            name="shopping-basket"
            color="#111111"
          />
          <TextInput
            style={styles.inputText}
            placeholder="Quantity"
            keyboardType="numeric"
            onChangeText={quantity => this.setState({quantity})}
            value={this.state.quantity}
          />
        </View>

        <View style={styles.inputContainer}>
          <Icon style={styles.inputLogo} name="assignment" color="#111111" />
          <TextInput
            style={styles.inputText}
            placeholder="Description"
            onChangeText={description => this.setState({description})}
            value={this.state.description}
          />
        </View>

        <Button
          style={styles.loginBtn}
          mode="contained"
          onPress={() => this.addNewProduct()}
          title="Login">
          Add Product
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
