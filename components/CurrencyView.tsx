import React from 'react';
import { View, TextInput, Text, StyleSheet, useColorScheme, TextInputTextInputEventData, NativeSyntheticEvent } from 'react-native';

interface CurrencyInputProps {
  amount: string;
  setAmount: (a: string) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ amount, setAmount }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 8,
      alignSelf: 'center',
    },
    input: {
      fontSize: 36,
      padding: 10,
      minWidth: 80,
      textAlign: 'right',
      color: isDarkMode ? 'white' : 'black',
    },
    currencySymbol: {
      fontSize: 24,
      marginLeft: 5,
      color: isDarkMode ? 'white' : 'black',
    },
  });
  const focusedStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 8,
      alignSelf: 'center',
      paddingHorizontal: 5,
      borderWidth: 1,
      borderColor: '#d0d0d0',
    },
    input: {
      fontSize: 36,
      padding: 10,
      minWidth: 80,
      textAlign: 'right',
      color: isDarkMode ? 'white' : 'black',
    },
    currencySymbol: {
      fontSize: 24,
      marginLeft: 5,
      color: isDarkMode ? 'white' : 'black',
    },
  });

  const onFocus = () => {
    setIsFocused(true);
  }

  const onBlur = () => {
    setIsFocused(false);
  }

  function handleTextChange(e: NativeSyntheticEvent<TextInputTextInputEventData>): void {
    const currentAmount = amount;
          e.preventDefault();
          //if e is a delete, remove last character
          if (e.nativeEvent.text === '') {
            const newAmount = currentAmount.slice(0, currentAmount.length - 1);
            setAmount(newAmount);
            return;
          }

          const newAmount = currentAmount + e.nativeEvent.text;
          setAmount(newAmount);
  }

  const formatAmount = (amount: string): string => {
    const amountString = amount.toString();
    const amountLength = amountString.length;
    if (amountLength === 0) {
      return '0.00';
    } else if (amountLength === 1) {
      return '0.0' + amountString;
    } else if (amountLength === 2) {
      return '0.' + amountString;
    } else {
      const wholePart = amountString.slice(0, amountLength - 2);
      const decimalPart = amountString.slice(amountLength - 2);
      return wholePart + '.' + decimalPart;
    }
  }
  

  return (
    <View style={ isFocused ? focusedStyles.container : styles.container}>
      <TextInput
        style={isFocused ? focusedStyles.input : styles.input}
        keyboardType="numeric"
        value={parseFloat(formatAmount(amount)).toString()}
        caretHidden
        inputMode='numeric'
        // onChangeText={(text) => handleTextChange(text)}
        onTextInput={handleTextChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <Text style={isFocused ? focusedStyles.currencySymbol : styles.currencySymbol}>$</Text>
    </View>
  );
};

export default CurrencyInput;
