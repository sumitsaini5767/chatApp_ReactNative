import React, { useEffect, useState } from 'react'
import { Backbutton, StatusProgressbar, WrapperContainer } from '../../../components/Componets'
import { styles } from './styles'
import { Image, Text, View } from 'react-native'
import { CommonColors } from '../../../styles/Colors'
import imagepath from '../../../constants/imagepath'
const statusDurations = [5000, 5000, 5000];
const UserStatus = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        if (currentIndex >= statusDurations.length) {
            // All statuses viewed
            return;
        }
    }, [currentIndex]);
    return (
        <WrapperContainer backgroundColor={CommonColors.black}>
            <View style={styles.progressRow}>
                {statusDurations.map((dur, index) => (
                        <StatusProgressbar
                            key={index}
                            duration={dur}
                            isActive={index === currentIndex}
                            onComplete={() => setCurrentIndex(prev => prev + 1)}
                        />

                ))}
            </View>
            <Backbutton tintColor={CommonColors.white} />
            <View style={styles.satusContainer}>
                <Image style={styles.Image} source={imagepath.status} resizeMode='contain' />
            </View>
        </WrapperContainer>
    )
}

export default UserStatus
