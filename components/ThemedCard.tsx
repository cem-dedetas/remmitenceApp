import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

interface CardProps {
    title?: string;
    children?: React.ReactNode;    
}

export const ThemedCard = ({ title, children }: CardProps) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
      backgroundColor: isDarkMode ? '#363636' : '#FFF',
      borderRadius: 12,
      padding: 16,
      margin: 8,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    titleText: {
      fontSize: 18,
      fontWeight: '500',
      color: isDarkMode ? '#FFFFFF' : '#555',
    },
  });

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.titleText}>{title}</Text>
        {children}
    </View>
  );
};
