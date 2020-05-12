import React, {Component} from 'react';
import {
  View,
  Text,
  AsyncStorage,
  FlatList,
  TouchableOpacity,
} from 'react-native';

export default class ProductList extends Component {
  id = {basketId: this.props.route.params.user};

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
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

  render() {
    const {data} = this.state;
    const {basketId} = this.id;
    return (
      <View>
        <Text>ELO JESTES TU</Text>
        <Text>{basketId}</Text>
        <FlatList
          data={data}
          keyExtractor={({_id}, index) => _id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                this.handleNavigate(item._id);
              }}>
              <Text>{item.productName}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}
