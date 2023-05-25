import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import AntDesign from 'react-native-vector-icons/AntDesign';

// get data from this URL!
const URL = 'https://dummyjson.com/products';

const App = () => {
  // managing state with 'useState'
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = () => {
    fetch(URL)
      .then(response => response.json()) // get response, convert to json
      .then(json => {
        setData(json.products);
      })
      .catch(error => alert(error)) // display errors
      .finally(() => setLoading(false)); // change loading state
  };

  const deletData = async id => {
    let result = await fetch(`${URL}/${id}`, {
      method: 'DELETE',
    });
    result = await result.json();
    if (result) {
      console.warn('User Deleted');
      getData(); //to refresh the list
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: responsiveWidth(0.1),
            }}>
            <Text style={styles.header}>API DATA</Text>
          </View>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={({id}) => id}
            renderItem={({item}) => (
              <View style={styles.card}>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.imagecontainer}>
                    <View style={styles.imagecontainer1}>
                      <Image
                        resizeMode="contain"
                        style={{
                          height: responsiveHeight(14),
                          width: responsiveWidth(30),
                        }}
                        source={{uri: item.thumbnail}}
                      />
                    </View>
                    <Text
                      style={[styles.title, {paddingTop: responsiveHeight(1)}]}>
                      {item.title}
                    </Text>
                  </View>

                  <View style={styles.component}>
                    <TouchableOpacity
                      onPress={() => deletData(item.id)}
                      style={{
                        marginLeft: responsiveWidth(35),
                        marginTop: responsiveHeight(2),
                      }}>
                      <AntDesign name="closecircleo" size={20} />
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={[
                          styles.title,
                          {
                            paddingTop: responsiveHeight(2),
                            paddingLeft: responsiveWidth(8),
                          },
                        ]}>
                        Price -
                      </Text>
                      <Text
                        style={[
                          styles.title,
                          {
                            paddingTop: responsiveHeight(2),
                            paddingLeft: responsiveWidth(2),
                          },
                        ]}>
                        Rs.{item.price}
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={[
                          styles.title,
                          {
                            paddingTop: responsiveHeight(1),
                            paddingLeft: responsiveWidth(8),
                          },
                        ]}>
                        Discount -
                      </Text>
                      <Text
                        style={[
                          styles.title,
                          {
                            paddingTop: responsiveHeight(1),
                            paddingLeft: responsiveWidth(2),
                          },
                        ]}>
                        {item.discountPercentage}%
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={[
                          styles.title,
                          {
                            paddingTop: responsiveHeight(1),
                            paddingLeft: responsiveWidth(8),
                          },
                        ]}>
                        Quantity -
                      </Text>
                      <Text
                        style={[
                          styles.title,
                          {
                            paddingTop: responsiveHeight(1),
                            paddingLeft: responsiveWidth(2),
                          },
                        ]}>
                        {item.stock} left
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsiveHeight(5),
  },
  header: {
    fontSize: responsiveFontSize(3),
    color: 'black',
  },
  card: {
    height: responsiveHeight(25),
    width: responsiveWidth(90),
    backgroundColor: 'white',
    marginTop: responsiveHeight(2),
    marginBottom: responsiveHeight(2),
    borderRadius: responsiveHeight(3),
    borderColor: 'grey',
    borderWidth: responsiveWidth(0.1),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(3),
    elevation: 10,
  },
  imagecontainer: {
    height: responsiveHeight(22),
    width: responsiveWidth(40),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: responsiveWidth(3),
    marginTop: responsiveHeight(1),
  },
  imagecontainer1: {
    height: responsiveHeight(15),
    width: responsiveWidth(38),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: responsiveWidth(0.1),
    borderRadius: responsiveHeight(1),
  },
  component: {
    height: responsiveHeight(22),
    width: responsiveWidth(43),
    backgroundColor: 'white',
  },

  title: {
    fontSize: responsiveFontSize(2),
    color: 'black',
  },
});

export default App;
