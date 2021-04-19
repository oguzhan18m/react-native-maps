import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import GlobalView from '../../components/GlobalView';

const Profile = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.avatarContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} />
        </View>
        <Text style={styles.nameSurname}>Phoebe Buffay</Text>
        <Text style={styles.email}>phoebe.buffay@gmail.com</Text>
      </View>
      <View style={styles.updateContainer}>
        <Text style={styles.updateContainerTitle}>Change Name/Surname</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} />
          <TextInput style={styles.input} />
        </View>
        <TouchableHighlight style={styles.saveBtn}>
          <Text style={styles.btnTextContainer}>Save</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.updateContainer}>
        <Text style={styles.updateContainerTitle}>Change Password</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} />
          <TextInput style={styles.input} />
        </View>
        <TouchableHighlight style={styles.saveBtn}>
          <Text style={styles.btnTextContainer}>Save</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer:{
    padding: 15,
  },
  avatarContainer: {},
  imageContainer: {},
  image: {},
  nameSurname: {},
  email: {},
  updateContainer: {},
  updateContainerTitle: {},
  inputContainer: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  input: {
    width:Dimensions.get('window').width / 2.2 ,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical:5,
  },
  saveBtn: {},
  btnTextContainer: {},
});

export default Profile;
