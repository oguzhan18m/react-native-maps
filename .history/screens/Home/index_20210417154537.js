import React, {useState, useEffect, useRef, useCallback} from 'react';
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
import * as projectActions from '../../auth/projectActions';
import {useRoute} from '@react-navigation/native';

// AIzaSyC1nE_j41wR79uanV8d8Dc1_Z4qjy2nm9c
// rachel.green@gmail.com

const Home = props => {
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [isParam, setIsParam] = useState(false);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  // map Reference
  const mapRef = useRef();
  // useRoute
  const route = useRoute();

  const onChangeValue = theRegion => {
    setRegion({...theRegion});
  };

  useEffect(() => {
    const {params = {region, title}} = route;
    // console.log(params.title);
    handleUserLocation(params.region);
    setIsParam(true)
  }, [route, handleUserLocation]);

  const handleUserLocation = useCallback(
    regionParams => {
      if (isParam) {
        setRegion({...regionParams});
        animateMap();
      } else {
        GeoLocation.getCurrentPosition(
          pos => {
            setIsParam(false);
            setRegion({
              ...region,
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            });
          },
          err => alert(err.message),
        );
      }
    },
    [route, isParam, animateMap],
  );

  const animateMap = () => {
    mapRef.current.animateToRegion(
      {
        ...region,
      },
      800,
    );
    setIsParam(false);
  };

  const saveToLocations = () => {
    projectActions.createNewLocation(title, region);
    setSaveModalOpen(false);
    setTitle('');
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

      {saveModalOpen ? (
        <View style={styles.saveModal}>
          <Text style={styles.modalTitle}>Save Location</Text>
          <TextInput
            style={styles.input}
            onChangeText={setTitle}
            value={title}
            placeholder="Title"
          />
          <View style={styles.modalBtnContainer}>
            <View>
              <TouchableHighlight
                onPress={() => setSaveModalOpen(false)}
                style={styles.cancelBtn}>
                <Text style={styles.btnTextContainer}>Cancel</Text>
              </TouchableHighlight>
            </View>
            <View>
              <TouchableHighlight
                onPress={saveToLocations}
                style={styles.saveBtn}>
                <Text style={styles.btnTextContainer}>Save</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      ) : null}
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
    marginLeft: -20,
    marginTop: -42,
  },
  icon: {
    height: 40,
    width: 35,
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
    left: Dimensions.get('window').width / 8,
    top: Dimensions.get('window').height / 2 / 2,
    width: '75%',
    height: '40%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Theme.MyTheme.colors.lightslate,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    width: '95%',
    fontSize: 18,
    paddingHorizontal: 10,
  },
  modalBtnContainer: {
    flexDirection: 'row',
  },
  cancelBtn: {
    backgroundColor: 'black',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
  },
  saveBtn: {
    backgroundColor: Theme.MyTheme.colors.favoriteYellow,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
  },
  btnTextContainer: {
    color: 'white',
    fontSize: 18,
  },
});

export default Home;