import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TextInput,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Button} from 'react-native-paper';

class AddProduct extends Component {
  basketId = {basketId: this.props.route.params.basketId};
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      refresh: true,
    };
  }

  componentDidMount = async () => {
    this.getData();
  };

  getData = async () => {
    console.log('biere dane');
    
    const {basketId} = this.basketId;

    var token = await AsyncStorage.getItem('token');
    console.log(token);
    var url =
      'http://192.168.0.105:3000/api/users/basket/' + basketId + '/userlist';
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
        this.setState({
          refresh: !this.state.refresh,
        });
        console.log(this.state.refresh);
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  };

  deleteBasket = async () => {
    const {basketId} = this.basketId;
    var token = await AsyncStorage.getItem('token');
    var url = 'http://192.168.0.105:3000/api/buckets/' + basketId;
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

  deleteUser = async userId => {
    const {basketId} = this.basketId;
    var token = await AsyncStorage.getItem('token');
    var url =
      'http://192.168.0.105:3000/api/users/' + userId + '/basket/' + basketId;
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
    const {data, isLoading} = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          List of users who belongs to whis basket
        </Text>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({_id}, index) => _id}
            extraData={this.state.refresh}
            style={styles.flatlist}
            renderItem={({item}) => (
              <View style={styles.row}>
                <View style={styles.touchable}>
                  <Text style={styles.white}>{item.displayName}</Text>
                </View>
                <TouchableOpacity
                  style={styles.touchableRed}
                  onPress={() => {
                    this.deleteUser(item._id);
                  }}>
                  <Icon name="delete" color="#ffffff" />
                </TouchableOpacity>
              </View>
            )}
          />
        )}
        <TouchableOpacity
          style={styles.deleteList}
          onPress={() => {
            Alert.alert('Alert', 'Are you sure?', [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {text: 'OK', onPress: () => this.deleteBasket()},
            ]);
          }}>
          <Text style={styles.deleteText}>Delete this list</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AddProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 18,
    paddingBottom: 30,
    marginTop: 30,
    color: '#111111',
  },
  input: {
    width: '90%',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginTop: 10,
  },
  userBtn: {
    backgroundColor: '#FFD700',
    width: '47%',
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    borderRadius: 8,
  },
  btnContainer: {
    fontSize: 18,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  touchable: {
    width: 250,
    height: 60,
    borderColor: '#ffffff',

    borderWidth: 2,
    marginTop: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#111111',
    marginHorizontal: 'auto',
    backgroundColor: '#ffffff',
  },
  view: {
    alignItems: 'center',
  },
  white: {
    color: '#111111',
    fontWeight: 'bold',
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
  },
  touchableRed: {
    width: 60,
    borderRadius: 40,
    backgroundColor: '#c92c20',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 15,
    marginLeft: 15,
    color: '#111111',
  },
  title: {
    paddingTop: 20,
    fontSize: 20,
  },
  flatlist: {
    maxHeight: 400,
  },
  deleteList: {
    width: '85%',
    height: 60,
    borderRadius: 40,
    backgroundColor: '#c92c20',
    justifyContent: 'center',
  },
  deleteText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 22,
  },
});
