import React from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
  Easing,
} from 'react-native-reanimated';
import { moderateScale } from '../../styles/scaling';

const Dot = ({ delay ,size}: { delay: number, size?: number }) => {
  const scale = useSharedValue(1);

  React.useEffect(() => {
    scale.value = withDelay(
      delay,
      withRepeat(
        withTiming(1.4, {
          duration: 400,
          easing: Easing.inOut(Easing.ease),
        }),
        -1, // infinite loop
        true // reverse animation
      )
    );
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: scale.value === 1 ? 0.6 : 1,
  }));

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: 4,
          backgroundColor: '#555',
          marginHorizontal: 4,
        },
        animatedStyle,
      ]}
    />
  );
};

const TypingIndicator = ({size=5}: { size?: number }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: moderateScale(30),
      }}
    >
      <Dot delay={0} size={size} />
      <Dot delay={150} size={size} />
      <Dot delay={300} size={size} />
    </View>
  );
};

export default TypingIndicator;
