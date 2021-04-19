/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Auth,Home,Profile,Places} from '../screens';
import * as Theme from '../theme';
import { Icon } from 'react-native-elements';

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
      name="Map"
      component={Home}
      options={{
        tabBarIcon: () => {
          return <Icon name="map-outline" type="ionicon" size={25} color="white"/>
        },
      }}
    />
    <Tabs.Screen
      name="Places"
      component={Places}
      options={{
        tabBarIcon: () => {
          return <Icon name="location-outline" type="ionicon" size={25} color="white"/>
        },
      }}
    />
    <Tabs.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: () => {
          return  <Icon name="person-outline" type="ionicon" size={25} color="white"/>
        },
      }}
    />
  </Tabs.Navigator>
);

const MainStack = createStackNavigator();
const MainNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Auth" component={Auth} options={()=>({
          title:'Auth'
      })} />
      <MainStack.Screen
        name="Home"
        component={TabsScreen}
        options={() => ({
          title: 'N2 Mobil',
          headerLeft: null,
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
            fontFamily: 'DidactGothic-Regular',
            fontSize: 26,
          },
        })}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
