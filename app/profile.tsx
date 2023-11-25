import { StyleSheet, View, useColorScheme, Image} from 'react-native'
import React from 'react'
import { useAuth } from '../context/AuthContext';
import { Text } from '../components/Themed';

const profile = () => {
  const {authState, onSignOut, promptAsync} = useAuth();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: 20,
      backgroundColor: isDarkMode ? '#000' : '#F0F0F0',
    },
    cardContent: {
      width: '100%',
      alignSelf: 'center',
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    contentText: {
      fontSize: 16,
      fontWeight: 'normal',
    },
    thinText: {
      fontSize: 14,
      fontWeight: '300',
    },

    separator: {
      marginVertical: 10,
      height: 1,
      width: '100%',
      borderWidth:1,
      borderColor: 'lightgrey',
    },

  });

  return (
    <View style={styles.container}>
      <Image source={{uri: authState?.user?.picture}} style={{width: 150, height: 150, borderRadius: 150, padding:10, marginBottom:50}} />
      <Text style={styles.title}>Welcome, {authState?.user?.name}</Text>
      <Text style={styles.thinText}>Email: {authState?.user?.email}</Text>
      
    </View>
  )
}

export default profile
