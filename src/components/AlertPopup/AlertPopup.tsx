import { StyleSheet, Text, View, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { styles } from './style'
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import Feather from 'react-native-vector-icons/Feather';

const AlertPopup = () => {
    const alert = useSelector((state: RootState) => state.alert);
    const moveAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const bounce = Animated.sequence([
            Animated.timing(moveAnim, {
                toValue: 20,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(moveAnim, {
                toValue: 10,
                duration: 500,
                useNativeDriver: true,
            }),
        ]);

        Animated.loop(bounce).start();
    }, [moveAnim]);

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: moveAnim }] }]}>
            {alert?.isSuccess
                ? <Feather name="check-circle" size={20} color="green" />
                : <Feather name="x-circle" size={20} color="red" />}
            <Text style={styles.text}>{alert?.text}</Text>
        </Animated.View>
    )
}

export default AlertPopup
