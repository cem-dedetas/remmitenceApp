import { View, Text, Image } from 'react-native'
import React from 'react'
import { useAuth } from '../context/AuthContext';
import { Stack, Tabs } from 'expo-router';

const Home = () => {
  const {authState, onSignOut, promptAsync} = useAuth();

  return (
    <Stack.Screen name="(tabs)" options={{ title: 'Home' }}/>
  )
}

export default Home