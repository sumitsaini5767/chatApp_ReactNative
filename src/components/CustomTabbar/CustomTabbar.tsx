import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import { styles } from './style';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const insets = useSafeAreaInsets();

    // Shared values for each tab
    const scales = React.useRef(state.routes.map(() => useSharedValue(1))).current;
    const opacities = React.useRef(state.routes.map(() => useSharedValue(0.6))).current;

    // Animate when focus changes
    React.useEffect(() => {
        state.routes.forEach((_, index) => {
            const isFocused = state.index === index;
            scales[index].value = withTiming(isFocused ? 1.2 : 1, { duration: 200 });
            opacities[index].value = withTiming(isFocused ? 1 : 0.6, { duration: 200 });
        });
    }, [state.index]);

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom }]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const label =
                    typeof options.tabBarLabel === 'function'
                        ? options.tabBarLabel({
                            focused: isFocused,
                            color: '',
                            position: "below-icon",
                            children: " ",
                        })
                        : options.title ?? route.name;

                const icon =
                    typeof options.tabBarIcon === 'function'
                        ? options.tabBarIcon({
                            focused: isFocused,
                            color: '',
                            size: 22,
                        })
                        : null;

                const animatedIconStyle = useAnimatedStyle(() => ({
                    transform: [{ scale: scales[index].value }],
                    opacity: opacities[index].value,
                }));

                const animatedLabelStyle = useAnimatedStyle(() => ({
                    opacity: opacities[index].value,
                }));

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        onPress={onPress}
                        style={styles.tab}
                        activeOpacity={0.8}
                    >
                        <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
                            {icon}
                        </Animated.View>
                        <Animated.Text
                            style={[styles.label, isFocused && styles.activeLabel, animatedLabelStyle]}
                        >
                            {label}
                        </Animated.Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default CustomTabBar;
