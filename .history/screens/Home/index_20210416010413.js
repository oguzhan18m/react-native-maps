import React, {useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import GlobalView from '../../components/GlobalView';
import MapView from 'react-native-maps';

const Home = props => {
  const [region, setRegion] = useState({
    latitudeDelta,
    longitudeDelta,
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const onChangeValue = theRegion => {
    setRegion({...theRegion});
  };

  return (
    <GlobalView>
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
    </GlobalView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
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
