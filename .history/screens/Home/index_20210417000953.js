import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  TextInput,
} from 'react-native';
// import GlobalView from '../../components/GlobalView';
import MapView from 'react-native-maps';
import GeoLocation from '@react-native-community/geolocation';
import {Icon} from 'react-native-elements';
import * as Theme from '../../theme';

// AIzaSyC1nE_j41wR79uanV8d8Dc1_Z4qjy2nm9c

const Home = props => {
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [title, setTitle] = useState('');
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
        onPress={() => setSaveModalOpen(!saveModalOpen)}
        style={styles.saveLocationBtn}>
        <Text style={{color: 'white'}}>
          <Icon name="save-outline" type="ionicon" size={25} color="white" />
        </Text>
      </TouchableHighlight>

      {saveModalOpen ?
        <View style={styles.saveModal}>
          <Text style={styles.modalTitle}>Please enter a title</Text>
          <TextInput
            style={styles.input}
            onChangeText={setTitle}
            value={title}
            placeholder="Title"
          />
          <View style={styles.modalBtnContainer}>
              <TouchableHighlight
                style={styles.cancelBtn}>
                <Text style={{color: 'white'}}>
                  <Icon name="close-circle-outline" type="ionicon" size={25} color="white" />
                  <Text>Cancel</Text>
                </Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.saveBtn}>
                <Text style={{color: 'white'}}>
                  <Icon name="save-outline" type="ionicon" size={25} color="white" />
                  <Text>Save</Text>
                </Text>
              </TouchableHighlight>
          </View>
        </View>
      : null}

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
    left: Dimensions.get('window').width / 2 / 2,
    top: Dimensions.get('window').height / 2 / 2,
    width: '50%',
    height: '40%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Theme.MyTheme.colors.lightslate,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle:{
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',
  },
  input: {
    borderWidth:1,
    borderRadius:10,
    borderColor:'black',
    width:'95%',
    fontSize:18,

  },
  modalBtnContainer:{
    flexDirection:'row',
  },
  cancelBtn:{
    width:'45%',
  }
});

export default Home;
