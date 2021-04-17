import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, View, Text, TouchableHighlight} from 'react-native';
// import GlobalView from '../../components/GlobalView';
import MapView from 'react-native-maps';
import GeoLocation from '@react-native-community/geolocation';
import {Icon} from 'react-native-elements';
import * as Theme from '../../theme';

// AIzaSyC1nE_j41wR79uanV8d8Dc1_Z4qjy2nm9c

const Home = props => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const onChangeValue = theRegion => {
    setRegion({...theRegion});
  };

  useEffect(() => {
    handleUserLocation();
  }, []);

  const handleUserLocation = () => {
    GeoLocation.getCurrentPosition(
      pos => {
        // alert(JSON.stringify(pos));
        setRegion({
          ...region,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        console.log(region);
      },
      err => alert(err.message),
    );
  };

  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={onChangeValue}
        ref={ref => (this.map = ref)}
      />
      <View style={styles.iconContainer}>
        <Image
          style={styles.icon}
          source={{
            uri:
              'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
          }}
        />
      </View>
      <TouchableHighlight
        style={styles.myLocation}
        onPress={handleUserLocation}>
        <Text style={{color: 'white'}}>
          <Icon name="locate-outline" type="ionicon" size={25} color="white" />
        </Text>
      </TouchableHighlight>

      <TouchableHighlight style={styles.saveLocationBtn}>
        <Text style={{color: 'white'}}>
          <Icon name="save-outline" type="ionicon" size={25} color="white" />
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: '100%',
  },
  iconContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
  },
  icon: {
    height: 100,
    width: 75,
  },
  myLocation: {
    position: 'absolute',
    bottom: 30,
    right: 10,
    width: 50,
    height: 50,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  saveLocationBtn:{
    position: 'absolute',
    bottom: 100,
    right: 10,
    width: 50,
    height: 50,
    backgroundColor: Theme.MyTheme.colors.priceGreen,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  }
});

export default Home;
