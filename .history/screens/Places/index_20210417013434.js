import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, FlatList, SafeAreaView,View} from 'react-native';
import GlobalView from '../../components/GlobalView';
import SinglePlace from '../../components/SinglePlace';

const Places = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
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
    };
    fetchProducts();
  }, []);

  console.log(places);

  return (
      <SafeAreaView style={styles.list}>
        <FlatList
          data={places}
          keyExtractor={item => item.key}
          renderItem={itemData => (
            <SinglePlace
              title={itemData.item.title}
              region={itemData.item.region}
            />
          )}
        />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default Places;
