import React, {useState, useEffect, useRef} from 'react';
import {Image, StyleSheet, View, Text, TouchableHighlight} from 'react-native';
// import GlobalView from '../../components/GlobalView';
import MapView from 'react-native-maps';
import GeoLocation from '@react-native-community/geolocation';
import {Icon} from 'react-native-elements';
import * as Theme from '../../theme';

// AIzaSyC1nE_j41wR79uanV8d8Dc1_Z4qjy2nm9c

const Home = props => {
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const mapRef = useRef();

  const onChangeValue = theRegion => {
    setRegion({...theRegion});
  };

  useEffect(() => {
    handleUserLocation();
  }, []);

  const handleUserLocation = () => {
    GeoLocation.getCurrentPosition(
      pos => {
        console.log(mapRef);
        setRegion({
          ...region,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        animateMap();
      },
      err => alert(err.message),
    );
  };

  const animateMap = () => {
    mapRef.current.animateToRegion(
      {
        ...region,
      },
      1000,
    );
  };

  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={onChangeValue}
        showsUserLocation={true}
        showsMyLocationButton={true}
        ref={mapRef}
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

      <TouchableHighlight
        onPress={prevState => setSaveModalOpen(!prevState)}
        style={styles.saveLocationBtn}>
        <Text style={{color: 'white'}}>
          <Icon name="save-outline" type="ionicon" size={25} color="white" />
        </Text>
      </TouchableHighlight>

      {saveModalOpen ? <View style={styles.saveModal} /> : null}
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
    marginLeft: -13,
    marginTop: -21,
  },
  icon: {
    height: 20,
    width: 18,
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
  saveLocationBtn: {
    position: 'absolute',
    bottom: 100,
    right: 10,
    width: 50,
    height: 50,
    backgroundColor: Theme.MyTheme.colors.priceGreen,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  saveModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '95%',
    height: '70%',
    backgroundColor: 'black',
  },
});

export default Home;
