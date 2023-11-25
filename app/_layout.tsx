import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, SplashScreen, Stack, router } from 'expo-router';
import { useEffect } from 'react';
import { Button, Pressable, useColorScheme } from 'react-native';
import AuthProvider from '../context/AuthProvider';
import { useAuth } from '../context/AuthContext';
import { FA5Style } from '@expo/vector-icons/build/FontAwesome5';
import { Text } from 'react-native';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const InitialLayout = () => {
  const { authState, didLoad } = useAuth();

  useEffect(() => {
    if (!didLoad) return;
    if (authState?.user) {
      return router.replace('/(tabs)/')
    }
    return router.replace('/login') 
    
    
    
  },[didLoad])

  return <Stack>
  <Stack.Screen name="login" options={{headerShown:false}}/>
  <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
  <Stack.Screen name="profile" options={{title:"Profile"}}/>
  <Stack.Screen name="transferDetails/[id]" options={{title:"Transfer Details", presentation:'modal', headerLeft(props) {
    return <Pressable onPress={() => router.back()} style={{flexDirection:'row'}}>
      <FontAwesome name='chevron-left' size={16} color='#007BFF' />
      <Text style={{marginLeft:5, color:'#007BFF'}}>Back</Text>
      
      </Pressable>
  },}}/>
</Stack>
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const { authState, onSignOut, promptAsync } = useAuth();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <InitialLayout></InitialLayout>
        {/* <Stack>
          
          <Stack.Screen name="index" options={{headerShown:true}}/>
          <Stack.Screen name="home" options={{headerShown:true}}/>
          <Stack.Screen name="login" options={{headerShown:true}}/>
          <Stack.Screen name="(tabs)" options={{headerShown:true}}/>
          <Stack.Screen name="profile" options={{title:"Profile"}}/>
          <Stack.Screen name="transferDetails/[id]" options={{title:"Transfer Details", presentation:'modal', headerLeft(props) {
            return <Pressable onPress={() => router.back()} style={{flexDirection:'row'}}>
              <FontAwesome name='chevron-left' size={16} color='#007BFF' />
              <Text style={{marginLeft:5, color:'#007BFF'}}>Back</Text>
              
              </Pressable>
          },}}/>
        </Stack> */}
      </ThemeProvider>
    </AuthProvider>
  );
}
