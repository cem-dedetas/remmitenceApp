import { Pressable, SafeAreaView, StyleSheet, useColorScheme } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { ScrollView, Text, View } from '../../components/Themed';
import { useEffect, useState } from 'react';
import SearchBar from '../../components/searchBar';
import { getTransfers, filteredTransfers } from '../../services/transferServices';
import { Transfer } from '../../models/transfer';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  
  const [searchText, setSearchText] = useState<string>('');
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getTransfers().then((transfers) => {
      setTransfers(transfers);
      setIsLoading(false);
    });
    
  }
  , []);

  const onSearch = () => {
    setIsLoading(true);
    filteredTransfers(searchText).then((transfers) => {
      setTransfers(transfers);
      setIsLoading(false);
    });
  }

  const renderItem = (transfer: Transfer) => {
    return (
      <Pressable onPress={() => {router.push(`/transferDetails/${transfer.id}`)}} key={transfer.id}>
      <View style={styles.itemContainer}>
        <View style={{backgroundColor: isDarkMode ? "#222":'#F0F0F0'}}>
          <Text style={styles.itemText}>{transfer.to}</Text>
          <Text style={styles.itemSubText}>Sent : {transfer.sent_amount}$</Text>
          <Text style={styles.itemSubText}>{(new Date(transfer.createdAt)).toLocaleString()}</Text>
        </View>
        
        
        <View style={{justifyContent:'center', backgroundColor: isDarkMode ? "#222":'#F0F0F0'}}><FontAwesome name='chevron-right' size={16} color='grey' /></View>
        
      </View>
      </Pressable>
    )
  }



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    scrollView: {
        width: '100%',
    },
    topBar: {
      display: 'flex',
      width: '100%',
      paddingHorizontal: 20,
      paddingBottom: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: isDarkMode ? "#000":'#F0F0F0',
    },
    itemContainer: {
      padding: 15,
      margin: 5, 
      marginHorizontal: 20,
      backgroundColor: isDarkMode ? "#222":'#F0F0F0', 
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    itemText : {color: isDarkMode ? "#F0F0F0":'#000', fontSize: 18, paddingVertical: 5},
    itemSubText : {color: isDarkMode ? "#E0E0E0":'#000', fontSize: 14}
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
      <Text style={styles.title}>History</Text>
        </View>
      
      <SearchBar onSearch={onSearch} searchText={searchText} setSearchText={setSearchText} />
      <ScrollView
        style={styles.scrollView}>
        {transfers.length>0 ? transfers.map((transfer) => {
          return renderItem(transfer)
        })
        : (!isLoading)? <Text style={{textAlign:'center', marginTop: 20}}>No transfers found</Text> : <Text style={{textAlign:'center', marginTop: 20}}>Loading...</Text>
      }
      </ScrollView>
    </SafeAreaView>
  );
}

