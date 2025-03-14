import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import MapScreen from "./map"; // ไฟล์ที่สร้างไว้
import TravelCostScreen from "./math.js"; // ไฟล์ที่สร้างไว้
import SettingsScreen from "./setting.js"; // ไฟล์ที่สร้างไว้

const Tab = createBottomTabNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: styles.tabBar,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Map') {
            iconName = 'map-marker';
          } else if (route.name === 'Calculator') {
            iconName = 'calculator';
          } else if (route.name === 'Settings') {
            iconName = 'cog';
          }
          return (
            <View style={[styles.tabIconContainer, focused && styles.focusedTab]}>
              <Icon name={iconName} size={30} color="black" />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Calculator" component={TravelCostScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />

    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#2D6A4F',
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    marginLeft: 25,
    marginRight: 25,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabIconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  focusedTab: {
    backgroundColor: '#FFD166',
  },
});

export default TabBar;
