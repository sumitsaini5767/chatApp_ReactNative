import React, {useMemo} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  ViewStyle,
  StyleProp,
  Platform,
} from 'react-native';
import {isColorDark} from '../../utils/isColorDark';

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


  const Wrapper = useScroll ? ScrollView : View;

  return (
    <>
      <StatusBar barStyle={computedBarStyle} translucent={true}/>
      <Wrapper
        style={[
          {
            flex: 1,
            backgroundColor,
            paddingTop:
              Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
          },
          !useScroll && contentContainerStyle,
        ]}
        contentContainerStyle={useScroll ? contentContainerStyle : undefined}>
        {children}
      </Wrapper>
    </>
  );
};

export default WrapperContainer;
