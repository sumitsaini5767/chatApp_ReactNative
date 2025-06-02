import React, { useMemo } from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  ViewStyle,
  StyleProp,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import { isColorDark } from '../../utils/isColorDark';

interface WrapperContainerProps {
  backgroundColor?: string;
  children?: React.ReactNode;
  useScroll?: boolean;
  statusBarStyle?: 'light-content' | 'dark-content';
  statusBarBackgroundColor?: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const WrapperContainer: React.FC<WrapperContainerProps> = ({
  backgroundColor = '#ffffff',
  children,
  useScroll = false,
  statusBarStyle,
  statusBarBackgroundColor,
  contentContainerStyle,
}) => {
  const computedBarStyle = useMemo(() => {
    return (
      statusBarStyle ||
      (isColorDark(backgroundColor) ? 'light-content' : 'dark-content')
    );
  }, [backgroundColor, statusBarStyle]);

  const baseStyle = useMemo(
    () => ({
      flex: 1,
      backgroundColor,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
    }),
    [backgroundColor]
  );

  return (
    <>
      <StatusBar
        barStyle={computedBarStyle}
        backgroundColor={statusBarBackgroundColor || backgroundColor}
        translucent
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          {useScroll ? (
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={contentContainerStyle}
              style={baseStyle}>
              {children}
            </ScrollView>
          ) : (
            <View style={[baseStyle, contentContainerStyle]}>
              {children}
            </View>
          )}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default React.memo(WrapperContainer);
