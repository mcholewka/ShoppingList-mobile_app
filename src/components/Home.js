import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {withNavigation} from 'react-navigation';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
    };
  }

  componentWillMount = async () => {
    var token = await AsyncStorage.getItem('token');
    console.log(token);
    fetch('http://192.168.0.105:3000/api/buckets', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    })
      .then(response => response.json())
      .then(json => {
        this.setState({data: json.buckets});
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.setState({isLoading: false});
        console.log(this.state.data.buckets[0].bucketName);
      });
  };

  handleNavigate = user => {
    const {navigation} = this.props;
    navigation.navigate('ProductList', {user});
  };

  render() {
    const {data, isLoading} = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.logo}> Your shopping buckets: </Text>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({_id}, index) => _id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.touchable}
                onPress={() => {
                  this.handleNavigate(item._id);
                }}>
                <Text style={styles.white}>{item.bucketName}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    );
  }
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2B2B2B',
  },
  logo: {
    fontSize: 18,
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
    width: 300,
    height: 60,
    borderColor: '#ffffff',
    borderWidth: 2,
    marginTop: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    marginHorizontal: 'auto',
  },
  view: {
    alignItems: 'center',
  },
  white: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 20
  }
});
