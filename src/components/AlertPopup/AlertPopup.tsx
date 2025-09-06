import { StyleSheet, Text, View, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { styles } from './style'
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import Feather from 'react-native-vector-icons/Feather';

const AlertPopup = () => {
    const alert = useSelector((state: RootState) => state.alert);

    const translateY = useRef(new Animated.Value(-50)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (alert?.text) {
            // reset before new alert
            translateY.setValue(-50);
            opacity.setValue(0);

            Animated.sequence([
                // Slide down + fade in
                Animated.parallel([
                    Animated.timing(translateY, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacity, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.delay(2000), // stay visible 2s
                // Only fade away slowly
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 800, // slow fade
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [alert]);

    if (!alert?.text) return null;

    return (
        <Animated.View style={[styles.container, {transform: [{ translateY }],opacity,},]}>
            {alert?.isSuccess ? (
                <Feather name="check-circle" size={20} color="green" />
            ) : (
                <Feather name="x-circle" size={20} color="red" />
            )}
            <Text style={styles.text}>{alert?.text}</Text>
        </Animated.View>
    );
};


export default AlertPopup
