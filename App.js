import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import Screens
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import ConcertPage from './ConcertPage';
import ProfilePage from './ProfilePage';
import TaylorSwift from './artist/taylor';
import HarryStyles from './artist/harry';
import Anirudh from './artist/ani';
import HipHopTamizha from './artist/hip';
import Sabrina from './artist/sabrina';

// Navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 🎵 Bottom Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        const icons = {
          Home: 'home',
          Concert: 'musical-notes',
          Profile: 'person',
        };
        return <Ionicons name={focused ? icons[route.name] : `${icons[route.name]}-outline`} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#1DB954',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: { backgroundColor: '#121212', paddingBottom: 5 },
      headerShown: false, // Hide header in tabs
    })}
  >
    <Tab.Screen name="Home" component={HomePage} />
    <Tab.Screen name="Concert" component={ConcertPage} />
    <Tab.Screen name="Profile" component={ProfilePage} />
  </Tab.Navigator>
);

// 🚀 Stack Navigator (Login + Main App)
const App = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      
      {/* Artist Pages */}
      <Stack.Screen name="TaylorSwift" component={TaylorSwift} />
      <Stack.Screen name="HarryStyles" component={HarryStyles} />
      <Stack.Screen name="Anirudh" component={Anirudh} />
      <Stack.Screen name="HipHopTamizha" component={HipHopTamizha} />
      <Stack.Screen name="Sabrina" component={Sabrina} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
