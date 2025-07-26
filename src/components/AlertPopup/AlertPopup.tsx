import { StyleSheet, Text, View, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { styles } from './style'
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
const AlertPopup = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const alert = useSelector((state:RootState)=>state.alert);
    useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true
            }
        ).start();
    }, [fadeAnim]);
    return (
        <Animated.View style={{
            ...styles.container
            , backgroundColor: alert?.isSuccess ?
                'rgba(64, 198, 57, 0.75)' :
                'rgba(197, 39, 15, 0.75)'
        }}>
            <Text style={styles.text}>{alert?.text}</Text>
        </Animated.View>
    )
}

export default AlertPopup
