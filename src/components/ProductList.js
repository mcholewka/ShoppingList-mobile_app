import React, {Component} from 'react';
import {
  View,
  Text,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {List, Checkbox} from 'react-native-paper';

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
  }

  componentWillMount = async () => {
    const {basketId} = this.id;
    console.log(basketId);
    var token = await AsyncStorage.getItem('token');
    const url =
      'http://192.168.0.105:3000/api/buckets/' + basketId + '/products';
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
        console.log(json);
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  };

  setChecked = async isBool => {
    const {basketId} = this.id;
    const {productId} = this.productId;
    var token = await AsyncStorage.getItem('token');
    const url =
      'http://192.168.0.105:3000/api/buckets/' +
      basketId +
      '/products/' +
      this.productId;
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
      .then(response => response.json())
      .then(json => {
        this.setState({data: json.products});
        this.componentWillMount();
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  };

  render() {
    const {data} = this.state;
    const {basketId} = this.id;
    const {basketName} = this.basketName;
    const {checked} = this.state;
    return (
      <View>
        <Text style={styles.basketName}>{basketName}</Text>
        <FlatList
          data={data}
          keyExtractor={({_id}, index) => _id}
          renderItem={({item}) => (
            <View style={styles.listContainer}>
              <List.Section style={styles.list}>
                <List.Accordion
                  title={item.productName}
                  left={props => <List.Icon {...props} icon="folder" />}>
                  <List.Item title="Quantity" description={item.quantity} />
                  <List.Item
                    title="Description"
                    description={item.description}
                  />
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
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
  },
});
