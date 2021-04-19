import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import * as Theme from '../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as authActions from '../../auth/authActions';

const Profile = props => {
  const [profile, setProfile] = useState({});
  const [storageData, setStorageData] = useState({});
  const [myName, setMyName] = useState('');
  const [mySurName, setMySurName] = useState('');
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const fetchNameSurname = async () => {
    try {
      const response = await fetch(
        `https://n2-mobile-2dbf3-default-rtdb.firebaseio.com/${storageData.userId}/user.json`,
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();
      console.log(resData);
      setProfile(resData);
    } catch (error) {
      throw new Error('Something went wrong with fetching products!');
    }
  };

  useEffect(() => {
    const fetchStorageData = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        props.navigation.navigate('Auth');
        return;
      }
      const transformedData = JSON.parse(userData);
      setStorageData(transformedData);
      console.log(storageData);
    };
    fetchStorageData().then(()=>{
      fetchNameSurname();
    });

  }, []);

  const handleChangeNameSurname = () => {
    authActions.changeNameSurname(
      myName,
      mySurName,
      storageData.token,
      storageData.userId,
    );
  };

  const handleChangePassword = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (!userData) {
      props.navigation.navigate('Auth');
      return;
    }
    const transformedData = JSON.parse(userData);
    const {token, userId, expiryDate} = transformedData;
    const expirationDate = new Date(expiryDate);

    if (expirationDate <= new Date() || !token || !userId) {
      props.navigation.navigate('Auth');
      return;
    }
    const expirationTime = expirationDate.getTime() - new Date().getTime();

    authActions.changePassword(userId, token, expirationTime, password);
  };

  console.log(profile);

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.avatarContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri:
                'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
            }}
          />
        </View>
        {/* {!profile.myName===null ? ( 
          <Text style={styles.nameSurname}>Enter your name below.</Text>
        ) : (
          <Text style={styles.nameSurname}>
            {profile.myName} {profile.mySurName}
          </Text>
        )} */}
        <Text style={styles.email}>{storageData.email}</Text>
      </View>
      <View style={styles.updateContainer}>
        <Text style={styles.updateContainerTitle}>Change Name/Surname</Text>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={setMyName}
            value={myName}
            placeholder="Name"
            style={styles.input}
          />
          <TextInput
            onChangeText={setMySurName}
            value={mySurName}
            placeholder="Surname"
            style={styles.input}
          />
        </View>
        <TouchableHighlight
          onPress={handleChangeNameSurname}
          style={styles.saveBtn}>
          <Text style={styles.btnTextContainer}>Save</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.updateContainer}>
        <Text style={styles.updateContainerTitle}>Change Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={setPassword}
            value={password.currentPassword}
            placeholder="Current Password"
            style={styles.input}
          />

          <TextInput
            onChangeText={setPassword}
            value={password.newPassword}
            placeholder="New Password"
            style={styles.input}
          />
        </View>
        <TouchableHighlight
          onPress={handleChangePassword}
          style={styles.saveBtn}>
          <Text style={styles.btnTextContainer}>Save</Text>
        </TouchableHighlight>
      </View>

      <TouchableHighlight
        onPress={() => authActions.logout()}
        style={styles.logoutBtn}>
        <Text style={{color: 'white'}}>LOGOUT</Text>
      </TouchableHighlight>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 15,
    backgroundColor: 'white',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    width: '50%',
    height: 100,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  nameSurname: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  email: {},
  updateContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    marginVertical: 20,
    padding: 15,
  },
  updateContainerTitle: {
    marginBottom: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    width: '48%',
    // width: Dimensions.get('window').width / 2.2,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
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
  logoutBtn: {
    width: '70%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginBottom: 40,
    alignSelf: 'center',
  },
  btnTextContainer: {},
});

export default Profile;
