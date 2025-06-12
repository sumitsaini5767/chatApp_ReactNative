import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { CommonColors } from '../../styles/Colors';
import { moderateScale, verticalScale } from '../../styles/scaling';
import FontFamily from '../../styles/FontFamily';

const Dropdown = () => {
    const [isDropDown, setIsDropdown] = useState(true);
    const data = [
        'Option 1',
        'Option 2',
        'Option 3',
        'Option 5',
        'Option 6',
        'Option 7',
        'Option 8',
        'Option 9',
        'Option 9',
        'Option 10',
    ];
    const renderItem = ({ item }: { item: string }) => (
        <TouchableOpacity style={styles.options}>
            <Text style={styles.optionText}>{item}</Text>
        </TouchableOpacity>
    );
    const keyExtractor = (item: string) => item;
    return (
        <>
            <TouchableOpacity
                onPress={() => setIsDropdown(!isDropDown)}
                style={styles.dropdownContainer}>
                <Text style={styles.optionText}>Select</Text>
                <Text style={styles.optionText}>▼</Text>
            </TouchableOpacity>
            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                style={{
                    ...styles.dropdownItem,
                    display: isDropDown ? 'flex' : 'none'
                }}
            />
        </>
    )
}

export default Dropdown

const styles = StyleSheet.create({
    dropdownContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: moderateScale(10),
        backgroundColor: CommonColors.buttonBackground,
        borderRadius: moderateScale(5),
        marginBottom: verticalScale(5),
        marginHorizontal: moderateScale(10),
    },
    dropdownItem: {
        marginHorizontal: moderateScale(10),
        height: verticalScale(100),
        borderRadius: moderateScale(10),
        backgroundColor: CommonColors.textSecondary,
    },
    options: {
        backgroundColor: CommonColors.buttonBackground,
        borderBottomWidth: moderateScale(1),
        borderColor: CommonColors.gray,
        padding: moderateScale(10),
        marginBottom: verticalScale(0),
    },
    optionText: {
        fontFamily: FontFamily.CarosSoftBold,
        fontSize: moderateScale(16),
    },
})