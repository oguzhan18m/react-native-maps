import React from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {Icon} from 'react-native-elements';
import * as Theme from '../../theme';

const SinglePlace = props => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../../assets/location_mark.jpeg')}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <TouchableHighlight
        onPress={() => {
          props.navigation.navigate('Map', {
            title: props.title,
            region: props.region,
          });
        }}
        style={styles.goLocationBtn}>
        <Text style={{color: 'white'}}>
          <Icon
            name="arrow-forward-circle-outline"
            type="ionicon"
            size={45}
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
    backgroundColor: Theme.MyTheme.colors.cardGrey,
    borderWidth: 1,
    borderColor: Theme.MyTheme.colors.lightslate,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 100,
  },
  imageContainer: {
    width: '15%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  textContainer: {
    width: '70%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily:'DidachGothic-Regular',
  },
  goLocationBtn: {
    width: '15%',
  },
});

export default SinglePlace;
