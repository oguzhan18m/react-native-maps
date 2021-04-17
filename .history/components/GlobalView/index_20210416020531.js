/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';

const GlobalView = ({children}) => {
  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: 'white',
          paddingTop: 0,
        },
      ]}>
      {children}
    </ScrollView>
  );
};

export default GlobalView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
