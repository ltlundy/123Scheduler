import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from './Screens/Home';
import SchedulesScreen from './Screens/Schedules';
import LoadingDocks from './Screens/LoadingDocks';
import Carriers from './Screens/Carriers';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator labeled={false} barStyle={{ backgroundColor: 'black' }} activeColor="white" >
      <Tab.Screen name="Home" component={HomeScreen}            //Home Screen
      options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26}/>
        ),
    }}/>
      <Tab.Screen name="Schedules" component={SchedulesScreen}        // Schedules Screen
      options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-month" color={color} size={26}/>
        ),
    }}/>
      <Tab.Screen name="Loading Docks" component={LoadingDocks}        // Schedules Screen
      options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="upload" color={color} size={26}/>
        ),
    }}/>
    <Tab.Screen name="Carriers" component={Carriers}        // Schedules Screen
      options={{
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="human-male-board" color={color} size={26}/>
        ),
    }}/>
    </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
