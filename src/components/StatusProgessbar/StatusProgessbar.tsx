import React, { useEffect, useRef } from 'react';
import { View, Animated, Text } from 'react-native';
import { styles } from './styles';

interface StatusProgressBarProps {
  duration?: number; // in milliseconds
  isActive?: boolean; // controls whether this bar should animate
  onComplete?: () => void; // optional callback when animation completes
}

const StatusProgressBar: React.FC<StatusProgressBarProps> = ({
  duration = 5000,
  isActive = false,
  onComplete,
}) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isActive) {
      progressAnim.setValue(0); // reset
      Animated.timing(progressAnim, {
        toValue: 1,
        duration,
        useNativeDriver: false,
      }).start(() => {
        onComplete?.();
      });
    }
  }, [isActive]);

  const widthInterpolated = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progressBar, { width: widthInterpolated }]} />
    </View>
  );
};

export default StatusProgressBar;
