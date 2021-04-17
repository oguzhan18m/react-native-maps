import React from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {Icon} from 'react-native-elements';

const SinglePlace = ({title, region}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/marker.png')}
        />
      </View>
      <View style={styles.textContainer}>
        <Text>{title}</Text>
      </View>
      <TouchableHighlight style={styles.goLocationBtn}>
        <Text style={{color: 'white'}}>
          <Icon name="arrow-forward-circle-outline" type="ionicon" size={25} color="white" />
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  imageContainer: {
      width:'20%',
  },
  image: {
    width:'60%',
  },
  goLocationBtn:{
    width:'20%',
  }
});

export default SinglePlace;
