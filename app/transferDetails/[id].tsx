import { Pressable, StyleSheet, View, useColorScheme } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { getTransfer } from '../../services/transferServices';
import { Transfer } from '../../models/transfer';
import { ThemedCard } from '../../components/ThemedCard';
import { Text } from '../../components/Themed';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const transferDetails = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  const { id } = useLocalSearchParams();
  const [transfer, setTransfer] = useState<Transfer>();
  useEffect(() => {
    if (!id || typeof id != 'string') return;
    getTransfer(id).then((transfer) => {
      setTransfer(transfer);
    });
  }
  , []);

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

  const getStatus = () => {
    //using completed: boolean;
    // pending: boolean;
    // issue: boolean;
    if (transfer?.completed) return 'Completed';
    if (transfer?.issue) return '(Failed) There was an issue with this transfer';
    if (transfer?.pending) return 'Transfer Pending';
    
    return 'Unknown Status';
  }

  return (
    <View style={styles.container}>
      
    <ThemedCard title="Transfer Details">
    <View style={styles.cardContent}>
      <View style={styles.separator}/>
      <Text style={styles.thinText}>To : </Text>
      <Text style={styles.title}>{transfer?.to}</Text>
      <View style={styles.separator}/>
      <Text style={styles.thinText}>Sent - Received: </Text>
      <Text style={styles.title}>{transfer?.sent_amount}$ - {transfer?.received_amount}$</Text>
      <View style={styles.separator}/>
      <Text style={styles.thinText}>Status : </Text>
      <Text style={styles.title}>{getStatus()}</Text>
      <View style={styles.separator}/>
      <Text style={styles.thinText}>Date : </Text>
      <Text style={styles.title}>{(new Date(transfer?.createdAt ?? "")).toLocaleString()}</Text>
      <View style={styles.separator}/>
      <Text style={styles.thinText}>Rate : </Text>
      <Text style={styles.title}>{transfer?.rate}</Text>
      <View style={styles.separator}/>


    </View>
    </ThemedCard>
    </View>
  )
}

export default transferDetails;