import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text, TextInput, TextInputProps, View, ViewStyle
} from 'react-native';
import React from 'react';
import { styles } from './style';
interface Props extends TextInputProps {
  inputContainerStyle?: ViewStyle;
  textStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  lable: string,
  error?: string,
}
const UserInput: React.FC<Props> = ({
  inputContainerStyle,
  textStyle,
  inputStyle,
  lable,
  error,
  secureTextEntry = false,
  ...rest
}) => {
  return (
    <>
      <View style={[styles.containerStyle, inputContainerStyle]}>
        <Text style={[styles.textStyle, textStyle]}>{lable}</Text>
        <TextInput style={[styles.inputStyle, inputStyle]} secureTextEntry={secureTextEntry} {...rest} />

      </View>
      {!!error && <Text style={styles.validation}>{error}</Text>}
    </>
  );
};

export default UserInput;
