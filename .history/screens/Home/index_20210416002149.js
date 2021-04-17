import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Home = props => {
  return (
    <View>
      <Text> Home Page </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

Home.navigationOptions = () => {
  return {
    headerLeft: null,
  };
};

export default Home;
