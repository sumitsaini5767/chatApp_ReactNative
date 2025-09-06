import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageStyle,
    ViewStyle,
    TextStyle
} from 'react-native';
import { moderateScale } from '../../styles/scaling';

const COLORS = [
    '#E57373', '#F06292', '#BA68C8', '#9575CD', '#7986CB',
    '#64B5F6', '#4DB6AC', '#81C784', '#AED581', '#FFD54F',
    '#FFB74D', '#A1887F'
];

const getRandomColor = (name: string): string => {
    let index = name.charCodeAt(0) % COLORS.length;
    return COLORS[index];
};

interface AvatarProps {
    name: string;
    imageUri?: string | null;
    size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ name, imageUri, size = 50 }) => {
    if (imageUri) {
        return (
            <Image
                source={{ uri: imageUri }}
                style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
            />
        );
    }

    return (
        <View
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
            <Text style={[styles.initial, 
                { fontSize: size / 2.5 }]}>{name.charAt(0).toUpperCase()}</Text>
        </View>
    );
};

interface Styles {
    circle: ViewStyle;
    initial: TextStyle;
    image: ImageStyle;
}

const styles = StyleSheet.create<Styles>({
    circle: {
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: moderateScale(10),
    },
    initial: {
        color: '#fff',
        fontWeight: 'bold',
    },
    image: {
        resizeMode: 'cover',
    },
});

export default Avatar;
