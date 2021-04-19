import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList, ActivityIndicator, View} from 'react-native';
import SinglePlace from '../../components/SinglePlace';

const Places = props => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchProducts = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch(
        'https://n2-mobile-2dbf3-default-rtdb.firebaseio.com/locations.json',
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      console.log(resData);

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
  }, []);

  console.log(places);

  if (isLoading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={fetchProducts}
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
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingTop: 10,
    paddingBottom:40,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
});

export default Places;
