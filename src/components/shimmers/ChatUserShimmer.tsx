import { StyleSheet, View, } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { moderateScale, verticalScale } from '../../styles/scaling';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const ChatUserShimmer = ({ style }: { style?: any }) => {
    return (
        <View style={{ flexDirection: 'row', ...style }}>
            <ShimmerPlaceHolder
                style={{
                    marginHorizontal: moderateScale(16),
                    borderRadius: moderateScale(50),
                    width: moderateScale(50),
                    height: moderateScale(50)
                }}
            />
            <View>
                <ShimmerPlaceHolder
                    style={{
                        borderRadius: moderateScale(50),
                        width: moderateScale(70),
                    }}
                />
                <ShimmerPlaceHolder
                    style={{
                        borderRadius: moderateScale(50),
                        marginTop: verticalScale(10)
                    }}
                />
            </View>
        </View>
    )
}

export default ChatUserShimmer

const styles = StyleSheet.create({})