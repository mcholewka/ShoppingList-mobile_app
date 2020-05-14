import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {FAB} from 'react-native-paper';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
    };
  }

  // getData = async () => {

  // }

  componentWillMount = async () => {
    const {navigation} = this.props;
    await navigation.addListener('focus', async () => {
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
    });
  };

  // async componentWillMount() {
  //   await console.log('123');
  //   const {navigation} = this.props;
  //   navigation.addListener('focus', () => {
  //     console.log('456');
  //   });
  // }

  handleNavigate = (user, name) => {
    const {navigation} = this.props;
    navigation.navigate('ProductList', {user, name});
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
                  this.handleNavigate(item._id, item.bucketName);
                }}>
                <Text style={styles.white}>{item.bucketName}</Text>
              </TouchableOpacity>
            )}
          />
        )}
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => {
            console.log('Pressed');
            const {navigation} = this.props;
            navigation.navigate('AddBasket');
          }}
        />
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
    fontSize: 20,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 10,
  },
});
