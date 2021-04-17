import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet} from 'react-native';


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
    <View>
      <Text>Places Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Places;
