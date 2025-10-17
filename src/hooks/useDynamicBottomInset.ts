import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Dimensions, Platform } from 'react-native';
import React, { useMemo } from 'react';
import { verticalScale } from '../styles/scaling';

const useDynamicBottomInset = () => {
    const insets = useSafeAreaInsets();

    const bottomPadding = useMemo(() => {
        if (Platform.OS === 'ios') return insets.bottom;

        const screenHeight = Dimensions.get('screen').height - verticalScale(38);
        const windowHeight = Dimensions.get('window').height;
        const diff = screenHeight - windowHeight;

        // ✅ 1. If there's a visible navigation bar, use that height
        if (diff > 0) return diff;

        // ✅ 2. If using gesture navigation (no visible nav bar), add a small safe margin
        if (insets.bottom === 0) return 16; // gesture handle area (safe zone)

        // ✅ 3. Otherwise just use the inset
        return insets.bottom;
    }, [insets.bottom]);

    return bottomPadding;
};

export default useDynamicBottomInset;
