import React, { useState } from 'react';
import { View, TextInput, StyleSheet, useColorScheme, Pressable } from 'react-native';
import { Text } from './Themed';
import { FontAwesome } from '@expo/vector-icons';

interface FormProps {
  onSubmit: (value: string) => void;
  children?: React.ReactNode;
}

export const ThemedForm = ({ onSubmit, children }: FormProps) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text: string) => {
    setInputValue(text);
  };

  const handleButtonPress = () => {
    onSubmit(inputValue);
    setInputValue(''); // Clear the input after submission
  };

  const styles = StyleSheet.create({
    formContainer: {
      marginTop: 8,
    },
    input: {
      height: 40,
      borderColor: isDarkMode ? '#555' : '#000',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 8,
      padding: 8,
      color: isDarkMode ? '#FFFFFF' : '#000',
    },
    button: {
      backgroundColor: '#007BFF',
      borderRadius: 8,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 8,

    },
    buttonText: {
      color: '#FFF',
      textAlign: 'center',
      fontSize: 20,

      marginRight: 5,
    },
  });

  return (
    <View style={styles.formContainer}>
      {children}
      
      <Pressable style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Send</Text>
        <FontAwesome name='paper-plane' size={16} style={{ marginBottom: -3 }}{...styles.buttonText} />
     </Pressable>
    </View>
  );
};
