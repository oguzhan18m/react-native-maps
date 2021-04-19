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
import * as Theme from '../../theme';

const Profile = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.avatarContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{uri:'https://img2.pngindir.com/20180402/ojw/kisspng-united-states-avatar-organization-information-user-avatar-5ac20804a62b58.8673620215226654766806.jpg'}} />
        </View>
        <Text style={styles.nameSurname}>Phoebe Buffay</Text>
        <Text style={styles.email}>phoebe.buffay@gmail.com</Text>
      </View>
      <View style={styles.updateContainer}>
        <Text style={styles.updateContainerTitle}>Change Name/Surname</Text>
        <View style={styles.inputContainer}>
          <TextInput placeholder='Name' style={styles.input} />
          <TextInput placeholder='Surname' style={styles.input} />
        </View>
        <TouchableHighlight style={styles.saveBtn}>
          <Text style={styles.btnTextContainer}>Save</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.updateContainer}>
        <Text style={styles.updateContainerTitle}>Change Password</Text>
        <View style={styles.inputContainer}>
          <TextInput placeholder='Current Password' style={styles.input} />
          <TextInput placeholder='New Password' style={styles.input} />
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
  avatarContainer: {
    alignItems:'center',
    marginBottom:20,
  },
  imageContainer: {
    width:'50%',
    height:100
  },
  image: {},
  nameSurname: {
    fontSize:30,
    fontWeight:'bold',
  },
  email: {},
  updateContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    marginVertical:20,
    padding:15,
  },
  updateContainerTitle: {
    marginBottom:20,
    fontWeight:'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:20,
  },
  input: {
    width:'48%',
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
  btnTextContainer: {},
});

export default Profile;
