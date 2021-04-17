import React from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {Icon} from 'react-native-elements';

const SinglePlace = ({title, region}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/location_mark.jpeg')}
        />
      </View>
      <View style={styles.textContainer}>
        <Text>{title}</Text>
      </View>
      <TouchableHighlight style={styles.goLocationBtn}>
        <Text style={{color: 'white'}}>
          <Icon
            name="arrow-forward-circle-outline"
            type="ionicon"
            size={25}
            color="black"
          />
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor:'yellow',
    marginBottom:50,
  },
  imageContainer: {
    width: '20%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textContainer: {
    width: '60%',
  },
  goLocationBtn: {
    width: '20%',
  },
});

export default SinglePlace;
