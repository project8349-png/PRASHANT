import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/LoginScreen';
import ActivityScreen from './screens/ActivityScreen';
import FriendsScreen from './screens/FriendsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = async (token, userData) => {
    setUserToken(token);
    setUser(userData);
    await AsyncStorage.setItem('userToken', token);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = async () => {
    setUserToken(null);
    setUser(null);
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('user');
  };

  if (!userToken) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#9333ea' },
          headerTitleStyle: { color: '#fff', fontWeight: 'bold' },
          headerRight: () => (
            <TouchableOpacity 
              style={{ marginRight: 15 }}
              onPress={handleLogout}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Logout</Text>
            </TouchableOpacity>
          ),
          tabBarActiveTintColor: '#9333ea',
          tabBarInactiveTintColor: '#999',
        }}
      >
        <Tab.Screen
          name="Activity"
          options={{
            title: '📝 Activity',
            tabBarLabel: 'Activity',
          }}
        >
          {() => <ActivityScreen token={userToken} />}
        </Tab.Screen>

        <Tab.Screen
          name="Friends"
          options={{
            title: '👥 Friends',
            tabBarLabel: 'Friends',
          }}
        >
          {() => <FriendsScreen token={userToken} />}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
