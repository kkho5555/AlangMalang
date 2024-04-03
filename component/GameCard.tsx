import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GameType, ScreenProps } from '../types';
import { widthScale, heightScale, moderateScale } from '../utils/Scaling';

interface IPage {
    item: Pick<
        GameType,
        'bgColor1' | 'bgColor2' | 'title' | 'type' | 'headCount' | 'imgPath' | 'gameManual'
    >;
    navigation: ScreenProps['navigation'];
    isActive: boolean;
}

export default function GameCard({ item, navigation, isActive }: IPage) {
    const [isDefault, setIsDefault] = useState(true);
    const getHeadCountText = () => {
        return `${item.headCount.min}인 ~ ${item.headCount.max}인`;
    };
    const handlePress = () => {
        setIsDefault((prevIsDefault) => !prevIsDefault);
    };

    return (
        <LinearGradient
            style={styles.frameContainer}
            colors={[item.bgColor1, item.bgColor2]}
        >
            <View>
                {isDefault ? (
                    <Image
                        style={styles.bgImage}
                        resizeMode="contain"
                        source={item.imgPath}
                    />
                ) : null}
                {isActive ? (
                    <TouchableOpacity onPress={handlePress}>
                        <View style={styles.contentsWrap}>
                            <Image
                                style={styles.iconRepeat}
                                resizeMode="contain"
                                source={require('../assets/icons/icon-repeat.png')}
                            />
                            <Text style={[styles.touchText, styles.textTypo]}>
                                {isDefault ? '게임하기' : '설명보기'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ) : null}
                <View style={styles.contentTitleContainer}>
                    <Text style={styles.contentTitle}>{item.title}</Text>
                    <View style={styles.teamIconContainer}>
                        <View style={styles.teamIconWrap}>
                            <Image
                                style={styles.teamIcon}
                                resizeMode="contain"
                                source={require('../assets/icons/icon-team.png')}
                            />
                        </View>
                        <Text style={[styles.teamText, styles.textTypo]}>
                            {item.type}, {getHeadCountText()}
                        </Text>
                    </View>
                </View>
            </View>
            {isDefault ? (
                isActive ? (
                    <View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => navigation.navigate('SubjectSelect')}
                            >
                                <Text style={styles.buttonText}>게임시작</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : null
            ) : (
                <ScrollView>
                    <View style={styles.descContainer}>
                        <Text style={styles.descText}>
                            출제자 : {item.gameManual.tester}
                        </Text>
                        <Text style={[styles.descText, { marginTop: 30 }]}>
                            참여자 : {item.gameManual.participant}
                        </Text>
                    </View>
                </ScrollView>
            )}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    frameContainer: {
        width: widthScale(360),
        height: heightScale(473),
        borderRadius: moderateScale(16),
        overflow: 'hidden',
        paddingHorizontal: widthScale(41),
        paddingVertical: heightScale(31),
        position: 'relative',
    },
    textTypo: {
        fontWeight: '600',
        fontSize: moderateScale(20),
    },
    contentsWrap: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconRepeat: {
        width: moderateScale(32),
        height: moderateScale(32),
        overflow: 'hidden',
    },
    touchText: {
        marginLeft: widthScale(14),
        letterSpacing: widthScale(-0.2),
        textAlign: 'left',
        color: '#FFFFFF',
    },
    contentTitleContainer: {
        marginTop: widthScale(24),
        justifyContent: 'center',
    },
    contentTitle: {
        fontSize: widthScale(48),
        letterSpacing: widthScale(-0.5),
        fontWeight: '700',
        color: '#FFFFFF',
    },
    teamIconContainer: {
        marginTop: heightScale(12),
        flexDirection: 'row',
        alignItems: 'center',
    },
    teamIconWrap: {
        padding: 5,
        alignItems: 'center',
    },
    teamIcon: {
        width: widthScale(34),
        height: heightScale(24),
    },
    teamText: {
        fontSize: moderateScale(20),
        letterSpacing: widthScale(-0.2),
        fontWeight: '600',
        marginLeft: widthScale(10),
        color: '#FFFFFF',
    },
    descContainer: {
        marginTop: heightScale(35),
    },
    descText: {
        fontSize: widthScale(24),
        width: widthScale(252),
        fontWeight: '500',
        letterSpacing: widthScale(-0.2),
        textAlign: 'left',
        color: '#FFFFFF',
    },
    bgImage: {
        width: moderateScale(360),
        height: moderateScale(473),
        left: moderateScale(-41),
        position: 'absolute',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        bottom: moderateScale(-170, 2),
    },
    button: {
        width: widthScale(300),
        height: heightScale(80),
        justifyContent: 'center',
        backgroundColor: 'rgba(20, 23, 19, 0.6)',
        borderRadius: 8,
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: widthScale(25),
    },
});
