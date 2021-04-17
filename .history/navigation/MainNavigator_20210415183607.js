/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home,Profile,Places} from '../screens';
import * as Theme from '../theme';
import {Icon} from 'react-native-elements';

const Tabs = createBottomTabNavigator();

const TabsScreen = () => (
  <Tabs.Navigator
    tabBarOptions={{
      activeBackgroundColor: Theme.MyTheme.colors.mainBlue,
      inactiveBackgroundColor: Theme.MyTheme.colors.mainBlueLow,
      activeTintColor: 'white',
      inactiveTintColor: '#dededf',
    }}>
    <Tabs.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: () => {
          return <Icon name="home-outline" type="ionicon" size={25} color="black"/>;
        },
      }}
    />
    <Tabs.Screen
      name="Places"
      component={Places}
      options={{
        tabBarIcon: () => {
          return <Icon name="home-outline" type="ionicon" size={25} color="black"/>;
        },
      }}
    />
    <Tabs.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: () => {
          return  <Icon name="home-outline" type="ionicon" size={25} color="black"/>;
        },
      }}
    />
  </Tabs.Navigator>
);

const MainStack = createStackNavigator();
const MainNavigator = () => {
  return (
    <MainStack.Navigator initialRouteName="App">
      <MainStack.Screen
        name="App"
        component={TabsScreen}
        options={({navigation}) => ({
          title: 'N2Mobil',
          headerTitleContainerStyle: {
            paddingHorizontal: 15,
          },
          headerRightContainerStyle: {
            paddingHorizontal: 15,
          },
          headerStyle: {
            backgroundColor: Theme.MyTheme.colors.mainBlue,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'AlfaSlabOne_400Regular',
            fontSize: 26,
          },
        })}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
