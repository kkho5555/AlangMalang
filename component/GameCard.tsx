import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import Text from '../component/DefaultText';
import { GameType, ScreenProps } from '../types';
import { heightScale, widthScale } from '../utils/Scaling';

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
            {isDefault ? (
                <Image
                    style={styles.bgImage}
                    resizeMode="cover"
                    source={item.imgPath}
                />
            ) : null}
            <View>
                {isActive ? (
                    <TouchableOpacity onPress={handlePress}>
                        <View style={styles.contentsWrap}>
                            <Image
                                style={styles.iconRepeat}
                                resizeMode="contain"
                                source={require('../assets/icons/icon-repeat.png')}
                            />
                            <Text style={[styles.touchText, styles.textTypo]}>
                                {isDefault ? '설명보기' : '게임하기'}
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
                                onPress={() =>
                                    navigation.navigate('SubjectSelect')
                                }
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
                        <Text
                            style={[
                                styles.descText,
                                { marginTop: heightScale(30) }
                            ]}
                        >
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
        borderRadius: heightScale(16),
        overflow: 'hidden',
        paddingHorizontal: widthScale(41),
        paddingVertical: heightScale(31),
        position: 'relative'
    },
    textTypo: {
        fontWeight: '600',
        fontSize: heightScale(20)
    },
    contentsWrap: {
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconRepeat: {
        width: heightScale(32),
        height: heightScale(32),
        overflow: 'hidden'
    },
    touchText: {
        marginLeft: heightScale(14),
        letterSpacing: heightScale(-0.2),
        textAlign: 'left',
        color: '#FFFFFF'
    },
    contentTitleContainer: {
        marginTop: heightScale(24),
        justifyContent: 'center'
    },
    contentTitle: {
        fontSize: heightScale(48),
        letterSpacing: heightScale(-0.5),
        fontWeight: '700',
        color: '#FFFFFF'
    },
    teamIconContainer: {
        marginTop: heightScale(12),
        flexDirection: 'row',
        alignItems: 'center'
    },
    teamIconWrap: {
        padding: 5,
        alignItems: 'center'
    },
    teamIcon: {
        width: heightScale(34),
        height: heightScale(24)
    },
    teamText: {
        fontSize: heightScale(20),
        letterSpacing: heightScale(-0.2),
        fontWeight: '600',
        marginLeft: heightScale(10),
        color: '#FFFFFF'
    },
    descContainer: {
        marginTop: heightScale(35)
    },
    descText: {
        fontSize: heightScale(24),
        width: widthScale(252),
        fontWeight: '500',
        letterSpacing: heightScale(-0.2),
        textAlign: 'left',
        color: '#FFFFFF'
    },
    bgImage: {
        width: widthScale(360),
        height: heightScale(473),
        top: 0,
        left: 0,
        position: 'absolute'
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        bottom: heightScale(-170)
    },
    button: {
        width: widthScale(300),
        height: heightScale(80),
        justifyContent: 'center',
        backgroundColor: 'rgba(20, 23, 19, 0.6)',
        borderRadius: heightScale(8)
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: '600',
        fontSize: heightScale(25)
    }
});
