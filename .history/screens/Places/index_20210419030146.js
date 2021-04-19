import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
  SafeAreaView,
  Text,
} from 'react-native';
import SinglePlace from '../../components/SinglePlace';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Places = props => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [storageData, setStorageData] = useState({});

  useEffect(() => {
    const fetchStorageData = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.navigate('Auth');
        return;
      }
      const transformedData = JSON.parse(userData);
      setStorageData(transformedData);
    };
    fetchStorageData();
  }, []);

  const fetchProducts = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch(
        `https://n2-mobile-2dbf3-default-rtdb.firebaseio.com/${storageData.userId}/locations.json`,
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();

      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push({
          key,
          title: resData[key].title,
          region: resData[key].region,
        });
      }
      setPlaces(loadedProducts);
    } catch (error) {
      throw new Error('Something went wrong with fetching products!');
    }
    setIsRefreshing(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchProducts().then(() => {
      setIsLoading(false);
    });
  }, [storageData]);

  if (isLoading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }
  console.log(places);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Text style={styles.pullToRefreshText}>Pull to refresh data</Text>
      <FlatList
        onRefresh={fetchProducts}
        ListFooterComponent={() => <View style={{height: 20}} />}
        refreshing={isRefreshing}
        style={styles.list}
        data={places}
        keyExtractor={item => item.key}
        renderItem={itemData => (
          <SinglePlace
            title={itemData.item.title}
            region={itemData.item.region}
            navigation={props.navigation}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingTop: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  pullToRefreshText: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
    color:'#fefefe',
  },
});

export default Places;
