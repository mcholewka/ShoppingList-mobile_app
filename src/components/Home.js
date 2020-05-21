import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {FAB} from 'react-native-paper';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
    };
  }

  componentDidMount = async () => {
    const {navigation} = this.props;
    await navigation.addListener('focus', async () => {
      var token = await AsyncStorage.getItem('token');
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
        });
    });
  };

  handleNavigate = (user, name) => {
    const {navigation} = this.props;
    navigation.navigate('ProductList', {user, name});
  };

  render() {
    const {data, isLoading} = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.logo}> Your shopping baskets </Text>
        <Divider style={styles.divider} />
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
    width: 300,
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 10,
    bottom: 10,
  },
  divider: {
    color: '#111111',
    backgroundColor: '#111111',
    width: 2,
  },
});
