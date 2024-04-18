import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GameType, ScreenProps } from '../types';

interface IPage {
    item: Pick<
        GameType,
        | 'bgColor1'
        | 'bgColor2'
        | 'title'
        | 'type'
        | 'headCount'
        | 'imgPath'
        | 'gameManual'
    >;
    navigation: ScreenProps['navigation'];
}

export default function Page({ item, navigation }: IPage) {
    const [isDefault, setIsDefault] = useState(true);

    const handlePress = () => {
        setIsDefault((prevIsDefault) => !prevIsDefault);
    };
    const getHeadCountText = () => {
        return `${item.headCount.min}인 ~ ${item.headCount.max}인`;
    };

    const gameStartHandler = () => {
        navigation.navigate('SubjectSelect');
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
                        resizeMode="cover"
                        source={item.imgPath}
                    />
                ) : null}
                <TouchableOpacity onPress={handlePress}>
                    <View style={styles.contentsWrap}>
                        <Image
                            style={styles.iconRepeat}
                            resizeMode="cover"
                            source={require('../assets/icons/icon-repeat.png')}
                        />
                        <Text style={[styles.touchText, styles.textTypo]}>
                            {isDefault ? '게임하기' : '설명보기'}
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.contentTitleContainer}>
                    <Text style={styles.contentTitle}>{item.title}</Text>
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
            </View>
            {isDefault ? (
                <View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={gameStartHandler}
                        >
                            <Text style={styles.buttonText}>게임시작</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={styles.descContainer}>
                    <Text style={styles.descText}>
                        출제자 : {item.gameManual.tester}
                    </Text>
                    <Text style={[styles.descText, { marginTop: 30 }]}>
                        참여자 : {item.gameManual.participant}
                    </Text>
                </View>
            )}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    frameContainer: {
        width: 360,
        height: 473,
        borderRadius: 16,
        marginHorizontal: 12,
        overflow: 'hidden',
        paddingHorizontal: 41,
        paddingVertical: 31,
        position: 'relative'
    },
    textTypo: {
        fontWeight: '600',
        fontSize: 20
    },
    contentsWrap: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconRepeat: {
        width: 32,
        height: 32,
        overflow: 'hidden'
    },
    touchText: {
        marginLeft: 14,
        letterSpacing: -0.2,
        textAlign: 'left',
        color: '#FFFFFF'
    },
    contentTitleContainer: {
        marginTop: 24,
        justifyContent: 'center'
    },
    contentTitle: {
        fontSize: 48,
        letterSpacing: -0.5,
        fontWeight: '700',
        color: '#FFFFFF'
    },
    teamIconContainer: {
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },
    teamIconWrap: {
        padding: 5,
        alignItems: 'center'
    },
    teamIcon: {
        width: 34,
        height: 24
    },
    teamText: {
        fontSize: 20,
        letterSpacing: -0.2,
        fontWeight: '600',
        marginLeft: 10,
        color: '#FFFFFF'
    },
    descContainer: {
        marginTop: 35
    },
    descText: {
        fontSize: 24,
        width: 252,
        fontWeight: '500',
        letterSpacing: -0.2,
        textAlign: 'left',
        color: '#FFFFFF'
    },
    bgImage: {
        width: 360,
        height: 473,
        left: -41,
        position: 'absolute'
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        bottom: -170
    },
    button: {
        width: 300,
        height: 80,
        justifyContent: 'center',
        backgroundColor: 'rgba(20, 23, 19, 0.6)',
        borderRadius: 8
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25
    }
});
