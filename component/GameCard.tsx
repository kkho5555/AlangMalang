import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GameType } from '../types';

interface IPage {
    item: Pick<
        GameType,
        'bgColor1' | 'bgColor2' | 'title' | 'type' | 'headCount' | 'imgPath'
    >;
}

export default function GameCard({ item }: IPage) {
    const getHeadCountText = () => {
        return `${item.headCount.min}인 ~ ${item.headCount.max}인`;
    };
    return (
        <LinearGradient
            style={styles.frameContainer}
            colors={[item.bgColor1, item.bgColor2]}
        >
            <View>
                <Image
                    style={styles.bgImage}
                    resizeMode="cover"
                    source={item.imgPath}
                />
                <Text style={[styles.contentsTitle, styles.textTypo]}>
                    {item.title}
                </Text>
                <View style={styles.teamIconContainer}>
                    <View style={styles.teamIconWrap}>
                        <Image
                            style={styles.teamIcon}
                            resizeMode="cover"
                            source={require('../assets/icons/icon-team.png')}
                        />
                    </View>
                    <Text style={[styles.teamText, styles.textTypo]}>
                        {item.type}, {getHeadCountText()}
                    </Text>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    frameContainer: {
        width: 304,
        height: 400,
        borderRadius: 16,
        marginHorizontal: 12,
        overflow: 'hidden',
        paddingHorizontal: 28,
        paddingVertical: 54,
    },
    textTypo: {
        textAlign: 'left',
        color: '#FFFFFF',
    },
    contentsTitle: {
        fontSize: 48,
        letterSpacing: -2,
        fontWeight: '700',
    },
    teamIconContainer: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    teamIconWrap: {
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
    },
    teamIcon: {
        width: 33,
        height: 23,
    },
    teamText: {
        fontSize: 20,
        letterSpacing: -0.2,
        fontWeight: '600',
        marginLeft: 16,
    },
    bgImage: {
        zIndex: -1,
        width: 304,
        height: 400,
        left: -28,
        position: 'absolute',
    },
});
