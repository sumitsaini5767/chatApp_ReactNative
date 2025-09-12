import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { moderateScale, verticalScale } from '../../styles/scaling';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const ChatShimmer = ({ style }: { style?: any }) => {
    return (
        <View style={{
            ...style,
        }}>
            <ShimmerPlaceHolder
                style={{
                    marginTop: verticalScale(10),
                    marginHorizontal: moderateScale(16),
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderStartEndRadius: 10,
                    width: moderateScale(150),
                    height: moderateScale(60),
                    alignSelf: 'flex-end'
                }}
            />
            <ShimmerPlaceHolder
                style={{
                    marginTop: verticalScale(20),
                    marginHorizontal: moderateScale(16),
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderSRadius: 10,
                    width: moderateScale(200),
                    height: moderateScale(80),
                    alignSelf: 'flex-start'
                }}
            />
            <ShimmerPlaceHolder
                style={{
                    marginTop: verticalScale(20),
                    marginHorizontal: moderateScale(16),
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderSRadius: 10,
                    width: moderateScale(160),
                    height: moderateScale(40),
                    alignSelf: 'flex-start'
                }}
            />
            <ShimmerPlaceHolder
                style={{
                    marginTop: verticalScale(20),
                    marginHorizontal: moderateScale(16),
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderStartEndRadius: 10,
                    width: moderateScale(180),
                    height: moderateScale(90),
                    alignSelf: 'flex-end'
                }}
            />
            <ShimmerPlaceHolder
                style={{
                    marginTop: verticalScale(20),
                    marginHorizontal: moderateScale(16),
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderSRadius: 10,
                    width: moderateScale(150),
                    height: moderateScale(60),
                    alignSelf: 'flex-start'
                }}
            />
            <ShimmerPlaceHolder
                style={{
                    marginTop: verticalScale(20),
                    marginHorizontal: moderateScale(16),
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderStartEndRadius: 10,
                    width: moderateScale(180),
                    height: moderateScale(50),
                    alignSelf: 'flex-end'
                }}
            />
            <ShimmerPlaceHolder
                style={{
                    marginTop: verticalScale(20),
                    marginHorizontal: moderateScale(16),
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderStartEndRadius: 10,
                    width: moderateScale(200),
                    height: moderateScale(70),
                    alignSelf: 'flex-end'
                }}
            />
        </View>
    )
}

export default ChatShimmer

const styles = StyleSheet.create({})