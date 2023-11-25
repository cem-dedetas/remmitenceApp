import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, useColorScheme } from 'react-native';

interface SearchBarProps {
    onSearch: () => void;
    searchText: string;
    setSearchText: (text: string) => void;
}


const SearchBar = ({ onSearch, searchText, setSearchText }:SearchBarProps) => {
    const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

    const styles = StyleSheet.create({
        container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 25,
        alignSelf: 'center',
        width: '90%',
        backgroundColor: isDarkMode ? '#363636' : '#FFF',
        marginVertical: 5,
        },
        input: {
        fontSize: 16,
        padding: 10,
        paddingStart: 20,
        minWidth: 80,
        textAlign: 'right',
        color: isDarkMode ? 'white' : 'black',
        overflow: 'scroll'
        },
        currencySymbol: {
        fontSize: 24,
        marginLeft: 5,
        color: isDarkMode ? 'white' : 'black',
        },
        searchButton: {
        backgroundColor: searchText.length>0? '#007BFF':'gray',
        borderRadius: 50,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        },
        buttonText: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
    
        marginRight: 5,
        },
    });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Recipient..."
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={setSearchText}
        textAlign='left'
        maxLength={30}
        onSubmitEditing={onSearch}
      />
      <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
        <FontAwesome name="search" size={16} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
