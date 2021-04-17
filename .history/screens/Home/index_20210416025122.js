import React, {useState} from 'react';
import {Image, StyleSheet,View} from 'react-native';
import GlobalView from '../../components/GlobalView';
import MapView from 'react-native-maps';

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

  return (
    <View style={{backgroundColor:'black'}}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={onChangeValue}
      />
      <View style={styles.iconContainer}>
        <Image
          style={styles.icon}
          source={require('../../assets/location_mark.jpeg')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width:'50%',
    height:'50%',
  },
  iconContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
  },
  icon: {
    height: 48,
    width: 48,
  },
});

export default Home;
