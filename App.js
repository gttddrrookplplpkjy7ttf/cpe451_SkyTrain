import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import TabBar from './components/TabBar';
import RouteSearchScreen from './components/RouteSearchScreen';
import MapScreen from './components/MapScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RouteSearch" component={RouteSearchScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
        <Tab.Screen name="หน้าหลัก" component={HomeStack} options={{ headerShown: false }} />
        <Tab.Screen name="ตั๋วของคุณ" component={HomeScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="โปรไฟล์" component={HomeScreen} options={{ headerShown: false }}/>
        <Tab.Screen name="ตั้งค่า" component={HomeScreen} options={{ headerShown: false }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
