import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { router } from 'expo-router';
const Login = () => {

    const { authState , promptAsync } = useAuth();

    useEffect(() => {
        if (authState?.user) {
            router.replace('/(tabs)/')
        }
    }
    , [authState?.isAuthenticated])
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Login</Text>
        <Text>{authState?.user?.name}</Text>
        <Text>{authState?.user?.email}</Text>
        <Button
        title="Sign In With Google"
        onPress={() => {if (promptAsync) {promptAsync()}}}
        />
        
    </View>
  );
};

export default Login;