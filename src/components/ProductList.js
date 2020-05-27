import React, {Component} from 'react';
import {
  View,
  Text,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
} from 'react-native';
import {List, Checkbox, FAB} from 'react-native-paper';
import {Icon} from 'react-native-elements';
import config from '../config/config.json';

export default class ProductList extends Component {
  id = {basketId: this.props.route.params.user};
  basketName = {basketName: this.props.route.params.name};

  productId = '';
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      checked: false,
      checkboxes: [],
    };
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            this.navigateToProductListSettings();
          }}>
          <Icon name="settings" color="#ffffff" />
        </TouchableOpacity>
      ),
    });
  }

  componentDidMount = async () => {
    const {navigation} = this.props;
    await navigation.addListener('focus', async () => {
      // const {basketId} = this.id;
      // var token = await AsyncStorage.getItem('token');
      // const url =
      //   'http://192.168.0.105:3000/api/buckets/' + basketId + '/products';
      // fetch(url, {
      //   method: 'GET',
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //     'auth-token': token,
      //   },
      // })
      //   .then(response => response.json())
      //   .then(json => {
      //     this.setState({data: json});
      //   })
      //   .catch(error => console.error(error))
      //   .finally(() => {
      //     this.setState({isLoading: false});
      //   });
      this.getData();
    });
  };

  getData = async () => {
    const {basketId} = this.id;
    var token = await AsyncStorage.getItem('token');
    const url = config.backendUrl + 'buckets/' + basketId + '/products';
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    })
      .then(response => response.json())
      .then(json => {
        this.setState({data: json});
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  };

  navigateToAddProduct = () => {
    const {navigation} = this.props;
    const {basketId} = this.id;
    navigation.navigate('AddProduct', {basketId});
  };

  navigateToAddUserToBasket = () => {
    const {navigation} = this.props;
    const {basketId} = this.id;
    navigation.navigate('AddUserToBasket', {basketId});
  };

  navigateToProductListSettings = () => {
    const {navigation} = this.props;
    const {basketId} = this.id;
    navigation.navigate('ProductListSettings', {basketId});
  };

  setChecked = async isBool => {
    const {basketId} = this.id;
    const {productId} = this.productId;
    var token = await AsyncStorage.getItem('token');
    const url =
      config.backendUrl + 'buckets/' + basketId + '/products/' + this.productId;
    console.log(url);
    fetch(url, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': token,
      },
      body: JSON.stringify({
        isBought: !isBool,
      }),
    })
      .then(response => {
        const code = response.status;
        const data = response.json();
        if (code === 200) {
          Alert.alert(
            'All products are in the basket :)',
            'Do you want to end this shopping list?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {text: 'OK', onPress: () => this.deleteBasket()},
            ],
          );
        }
        return data;
      })
      .then(data => {
        this.setState({data: data.products});
        this.componentDidMount();
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  };

  deleteBasket = async () => {
    const {basketId} = this.id;
    var token = await AsyncStorage.getItem('token');
    var url = config.backendUrl + 'buckets/' + basketId;
    fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    })
      .then(response => response.json())
      .then(json => {
        const {navigation} = this.props;
        navigation.navigate('Home');
      })
      .catch(error => console.error(error));
  };

  deleteProduct = async () => {
    const {basketId} = this.id;
    const {productId} = this.productId;
    var token = await AsyncStorage.getItem('token');
    const url =
      config.backendUrl + 'buckets/' + basketId + '/products/' + this.productId;
    console.log(url);
    fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    })
      .then(response => response.json())
      .then(json => {})
      .catch(error => console.error(error));
    await this.getData();
  };

  render() {
    const {data} = this.state;
    const {basketId} = this.id;
    const {basketName} = this.basketName;
    const {checked} = this.state;
    return (
      <View style={styles.big}>
        <Text style={styles.basketName}>{basketName}</Text>
        <FlatList
          data={data}
          keyExtractor={({_id}, index) => _id}
          renderItem={({item}) => (
            <View style={styles.listContainer}>
              <List.Section style={styles.list}>
                <List.Accordion
                  title={item.productName}
                  // left={props => <List.Icon {...props} icon="folder" />}
                >
                  <List.Item title="Quantity" description={item.quantity} />
                  <List.Item
                    title="Description"
                    description={item.description}
                  />
                  <TouchableOpacity
                    style={styles.insideBtn}
                    title="123"
                    onPress={() => {
                      this.productId = item._id;
                      this.deleteProduct();
                    }}>
                    <Icon name="delete" color="#ffffff" />
                  </TouchableOpacity>
                </List.Accordion>
              </List.Section>
              <Checkbox
                style={styles.checkbox}
                status={item.isBought ? 'checked' : 'unchecked'}
                onPress={() => {
                  this.productId = item._id;
                  this.setChecked(item.isBought);
                }}
              />
            </View>
          )}
        />
        <FAB
          style={styles.fab}
          icon="account-plus"
          onPress={() => {
            this.navigateToAddUserToBasket();
          }}
        />
        <FAB
          style={styles.fab2}
          icon="cart-plus"
          onPress={() => {
            this.navigateToAddProduct();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width: '90%',
    borderRadius: 30,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  list: {
    width: '87%',
  },
  checkbox: {
    height: 120,
  },
  basketName: {
    textAlign: 'center',
    paddingTop: 30,
    fontSize: 25,
    paddingBottom: 20,
  },
  big: {
    textAlign: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 10,
  },
  fab2: {
    position: 'absolute',
    margin: 16,
    right: 90,
    bottom: 10,
  },
  touchable: {
    width: 50,
    height: 50,
    paddingTop: 12,
  },
  insideBtn: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#c91414',
    right: -35,
    bottom: 10,
    justifyContent: 'center',
  },
});
