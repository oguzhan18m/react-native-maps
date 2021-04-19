import React from 'react';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import GlobalView from '../../components/GlobalView';

const Profile = () => {
  return (
    <GlobalView>
      <View style={styles.avatarContainer}>
          <View style={styles.imageContainer}>
              <Image style={styles.image} />
          </View>
          <Text>Phoebe Buffay</Text>
          <Text>phoebe.buffay@gmail.com</Text>
      </View>
      <View style={styles.changeNameContainer}>
            <TextInput />
            <TextInput />
      </View>
    </GlobalView>
  );
};

const styles = StyleSheet.create({});

export default Profile;
