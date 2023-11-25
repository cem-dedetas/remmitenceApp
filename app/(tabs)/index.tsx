import { Image, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { ScrollView, Text, View as ThemedView } from '../../components/Themed';
import { useAuth } from '../../context/AuthContext';
import { ThemedCard } from '../../components/ThemedCard';
import { Link, router } from 'expo-router';
import { ThemedForm } from '../../components/ThemedForm';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import ThemedTextField from '../../components/ThemedTextInput';
import CurrencyInput from '../../components/CurrencyView';
import { createTransfer } from '../../services/transferServices';

export default function TabOneScreen() {

    const {authState, onSignOut, promptAsync} = useAuth();
    const [amount, setAmount] = useState('0');
    const [name , setName] = useState<string>('');
    const [recipient, setRecipient] = useState('');
    const [memo, setMemo] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = () => {
      setIsLoading(true);
        createTransfer({
            to: name,
            sent_amount: parseFloat(amount),
        }).then((transfer) => {
          setIsLoading(false);
            router.push(`/transferDetails/${-1}`);
        });
    }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
            <Text style={styles.title}>Welcome, {authState?.user?.given_name}</Text>
            {/* Clipped image , circle */}
            <Pressable onPress={() => {router.push('/profile')}}>
                <Image source={{uri: authState?.user?.picture}} style={{width: 50, height: 50, borderRadius: 50}} />
            </Pressable>
        </View>
        <View style={styles.content}>
            <ThemedCard title='New Transaction'>
                <View style={styles.cardContent}>
                    {!isLoading ? (<ThemedForm onSubmit={onSubmit}>
                        <CurrencyInput amount={amount} setAmount={setAmount} />

                        <ThemedTextField placeholder='Recipient name' onChangeValue={(a) => {if (typeof a == 'string') setName(a)}} />
                        <ThemedTextField placeholder='Recipient e-mail' onChangeValue={(a) => {if (typeof a == 'string') setRecipient(a)}} />
                        <ThemedTextField placeholder='Description' isMultiline={true} onChangeValue={(a) => {if (typeof a == 'string') setMemo(a)}}  />
                        
                    </ThemedForm>)
                  : (<Text>Loading...</Text>)  
                  }
                </View>
            </ThemedCard>
        </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  topBar: {
    display: 'flex',
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formTextInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  cardContent: {
    width: '100%',
    alignSelf: 'center',
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
    content:{
        display: 'flex',
        width: '100%',
        padding: 20,
        alignItems: 'center'
    }
});
