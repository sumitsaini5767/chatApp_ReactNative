import React, { useState, useEffect } from 'react';
import {
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Pressable,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate,
} from 'react-native-reanimated';
import { moderateScale } from '../../styles/scaling';

const COLORS = [
    '#E57373', '#F06292', '#BA68C8', '#9575CD', '#7986CB',
    '#64B5F6', '#4DB6AC', '#81C784', '#AED581', '#FFD54F',
    '#FFB74D', '#A1887F',
];

const getRandomColor = (name: string): string => {
    const index = name.charCodeAt(0) % COLORS.length;
    return COLORS[index];
};

interface AvatarProps {
    name: string;
    imageUri?: string | null;
    size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ name, imageUri, size = 50 }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const scale = useSharedValue(0);
    const opacity = useSharedValue(0);

    const openModal = () => {
        setModalVisible(true);
        // Delay small to allow modal to mount before animating
        setTimeout(() => {
            scale.value = withTiming(1, { duration: 250 });
            opacity.value = withTiming(1, { duration: 250 });
        }, 50);
    };

    const closeModal = () => {
        scale.value = withTiming(0, { duration: 250 });
        opacity.value = withTiming(0, { duration: 200 });
        setTimeout(() => setModalVisible(false), 250);
    };

    const animatedStyle = useAnimatedStyle(() => {
        const scaleValue = interpolate(scale.value, [0, 1], [0.8, 1], 'clamp');
        return {
            transform: [{ scale: scaleValue }],
            opacity: opacity.value,
        };
    });

    if (imageUri) {
        return (
            <>
                {/* Small avatar thumbnail */}
                <TouchableOpacity onPress={openModal}>
                    <Image
                        source={{ uri: imageUri }}
                        style={[
                            styles.image,
                            {
                                width: size,
                                height: size,
                                borderRadius: size / 2,
                                backgroundColor: getRandomColor(name),
                            },
                        ]}
                    />
                </TouchableOpacity>

                {/* Fullscreen animated modal */}
                <Modal visible={modalVisible} transparent animationType="none">
                    <Pressable style={styles.modalBackground} onPress={closeModal}>
                        <Animated.Image
                            source={{ uri: imageUri }}
                            style={[styles.fullImage, animatedStyle]}
                            resizeMode="cover"
                        />
                    </Pressable>
                </Modal>
            </>
        );
    }

    // Fallback letter avatar
    return (
        <TouchableOpacity
            style={[
                styles.circle,
                {
                    backgroundColor: getRandomColor(name),
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                },
            ]}
        >
            <Text style={[styles.initial, { fontSize: size / 2.5 }]}>
                {name.charAt(0).toUpperCase()}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    circle: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: moderateScale(10),
        marginTop: moderateScale(8),
    },
    initial: {
        color: '#fff',
        fontWeight: 'bold',
    },
    image: {
        resizeMode: 'cover',
        alignSelf: 'center',
        marginRight: moderateScale(10),
        marginTop: moderateScale(8),
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.80)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullImage: {
        width: '90%',
        height: '60%',
        borderRadius: moderateScale(10),
    },
});

export default Avatar;
