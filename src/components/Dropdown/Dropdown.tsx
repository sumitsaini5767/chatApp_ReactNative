import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from './style';
import { CommonColors } from '../../styles/Colors';

interface Props {
    placeHolder?: string;
    options: Array<string>;
    onSelect?: (selected: string) => void;
    containerStyle?: ViewStyle;
}

const Dropdown: React.FC<Props> = ({
    placeHolder = 'Select',
    options,
    onSelect,
    containerStyle,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const handleSelect = (item: string) => {
        setSelectedValue(item);
        onSelect?.(item);
        setIsVisible(false);
    };
    return (
        <View style={[styles.mainContainer, containerStyle]}>
            <TouchableOpacity
                onPress={() => setIsVisible(true)}
                style={styles.dropdownContainer}>
                <Text style={styles.placeholderText}>{selectedValue || placeHolder}</Text>
                <Text style={styles.placeholderText}>▼</Text>
            </TouchableOpacity>
            <Modal
                visible={isVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setIsVisible(false)}>
                <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
                    <View style={styles.modalBackdrop}>
                        <View style={styles.dropdownItem}>
                            <FlatList
                                data={options}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.options}
                                        onPress={() => handleSelect(item)}
                                    >
                                        <Text style={{
                                            ...styles.optionText,
                                            color: item === selectedValue ?
                                                CommonColors.inputTextColor
                                                : styles.optionText.color
                                        }}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item, index) => `${item}-${index}`}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

export default Dropdown;
