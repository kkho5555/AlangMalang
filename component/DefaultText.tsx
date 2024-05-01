import React from 'react';
import { Text } from 'react-native';
import { fontFamily } from 'nativewind/dist/postcss/to-react-native/properties/font-family';

// @ts-ignore
const DefaultText = ({ children, style }) => {
    let fontStyle: { fontFamily: string }[];

    if (style.fontWeight === '500') {
        fontStyle = [{ fontFamily: 'Pretendard500' }];
    } else if (style.fontWeight === '600') {
        fontStyle = [{ fontFamily: 'Pretendard600' }];
    } else if (style.fontWeight === '700') {
        fontStyle = [{ fontFamily: 'Pretendard700' }];
    } else {
        fontStyle = [{ fontFamily: 'Pretendard' }];
    }

    if (style.fontFamily) {
        fontStyle = [{ fontFamily: style.fontFamily }];
    }

    if (style) {
        if (Array.isArray(style)) {
            fontStyle = fontStyle.concat(style);
        } else {
            fontStyle.push(style);
        }
    }

    return (
        <Text style={fontStyle}>
            {children}
        </Text>
    );
};

export default DefaultText;