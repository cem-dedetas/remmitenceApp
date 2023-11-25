import React from 'react';
import { TextInput, StyleSheet, useColorScheme, TextInputProps, StyleProp, ViewStyle } from 'react-native';

interface CustomTextFieldProps extends TextInputProps {
  isNumber?: boolean;
  isMultiline?: boolean;
  reservesSpace?: boolean;
  lineLimit?: number;
  style?: StyleProp<ViewStyle>; // Add style prop
  onChangeValue : (value:number|string) => void,
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  isNumber = false,
  isMultiline = false,
  lineLimit = 1,
  placeholder = '',
  defaultValue = '',
  onChangeValue = () => {},
}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const handleChange = (text: string) => {
    if (isNumber) {
      const number = parseFloat(text);
      onChangeValue(number);
    } else {
        onChangeValue(text);
    }
  };
  const styles = StyleSheet.create({
    textInput: {
      padding: 10,
      borderRadius: 8,
      fontSize: 16,
      color: isDarkMode ? 'white' : 'black',
      backgroundColor: isDarkMode ? '#333' : '#eee',
        marginVertical: 5,
    },
    multilineTextInput: {
      padding: 10,
      borderRadius: 8,
      fontSize: 16,
      color: isDarkMode ? 'white' : 'black',
      backgroundColor: isDarkMode ? '#333' : '#eee',
      marginVertical: 5,
      textAlignVertical: 'top',
      height: 150,
    }

  });

  return (
    <TextInput
      style={ isMultiline ? styles.multilineTextInput : styles.textInput }
      keyboardType={isNumber ? 'numeric' : 'default'}
      numberOfLines={lineLimit}
      placeholder={placeholder}
      multiline={isMultiline}
      placeholderTextColor={isDarkMode ? 'lightgrey' : 'darkgrey'}
      defaultValue={defaultValue}
      onChangeText={handleChange}
    />
  );
};



export default CustomTextField;
