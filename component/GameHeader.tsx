import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Text from './DefaultText';
import { ScreenProps } from '../types';
import { Color } from '../assets/GlobalStyles';
import { widthScale, heightScale, moderateScale } from '../utils/Scaling';
import ScoreReset from './modal/ScoreReset';
import PlayerSettings from './modal/PlayerSettings';

interface IGameHeader {
    title: string;
    isBack: boolean;
    isPlaySetting: boolean;
    isTeamSetting: boolean;
    isRefreshSetting: boolean;
    navigation: ScreenProps['navigation'];
}

export default function GameHeader({
                                       navigation,
                                       title,
                                       isBack = false,
                                       isPlaySetting = false,
                                       isTeamSetting = false,
                                       isRefreshSetting = false
                                   }: IGameHeader) {
    const [resetModalVisible, setResetModalVisible] = useState(false);
    const [playerSettingModalVisible, setPlayerSettingModalVisible] = React.useState(false);

    const handlerBack = () => {
        navigation.goBack();
    };

    const handlerTeamSetting = () => {
        setPlayerSettingModalVisible(true);
    };

    const handlerPlaySetting = () => {
        navigation.navigate('PlaySettings');
    };

    const handlerScoreResetSetting = () => {
        setResetModalVisible(true);
    };

    return (
        <>
            <View style={styles.headerContainer}>
                {isBack && (
                    <TouchableOpacity onPress={handlerBack}>
                        <View style={styles.settingWrap}>
                            <View style={styles.iconWrap}>
                                <Image
                                    style={styles.iconArrow}
                                    resizeMode="cover"
                                    source={require('../assets/icons/icon-left-arrow.png')}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                )}

                <Text style={styles.mainText}>{title}</Text>

                {isPlaySetting && (
                    <TouchableOpacity onPress={handlerPlaySetting}>
                        <View style={styles.settingWrap}>
                            <View style={styles.iconWrap}>
                                <Image
                                    style={styles.iconSetting}
                                    resizeMode="cover"
                                    source={require('../assets/icons/icon-setting.png')}
                                />
                            </View>
                            <Text style={styles.settingText}>플레이 설정</Text>
                        </View>
                    </TouchableOpacity>
                )}

                {isTeamSetting && (
                    <TouchableOpacity onPress={handlerTeamSetting}>
                        <View style={styles.settingWrap}>
                            <View style={styles.iconWrap}>
                                <Image
                                    style={styles.iconSetting}
                                    resizeMode="cover"
                                    source={require('../assets/icons/icon-team-setting.png')}
                                />
                            </View>
                            <Text style={styles.settingText}>팀 설정</Text>
                        </View>
                    </TouchableOpacity>
                )}

                {isRefreshSetting && (
                    <TouchableOpacity onPress={handlerScoreResetSetting}>
                        <View style={styles.settingWrap}>
                            <View style={styles.iconWrap}>
                                <Image
                                    style={styles.iconSetting}
                                    resizeMode="cover"
                                    source={require('../assets/icons/icon-refresh-setting.png')}
                                />
                            </View>
                            <Text style={styles.settingText}>점수 초기화</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
            <ScoreReset
                modalVisible={resetModalVisible}
                setModalVisible={setResetModalVisible}
            />
            <PlayerSettings modalVisible={playerSettingModalVisible} setModalVisible={setPlayerSettingModalVisible} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Color.background,
        paddingHorizontal: widthScale(30)
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    mainText: {
        flex: 1,
        color: Color.mainText,
        textAlign: 'center',
        fontSize: heightScale(50),
        fontWeight: '600',
        fontFamily: 'ONE Mobile POP'
    },
    settingWrap: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconWrap: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconArrow: {
        width: heightScale(48),
        height: heightScale(36)
    },
    iconSetting: {
        width: heightScale(40),
        height: heightScale(40)
    },
    settingText: {
        color: '#B9BAB9',
        fontWeight: '500',
        fontSize: heightScale(20),
        marginTop: heightScale(12)
    }
});
