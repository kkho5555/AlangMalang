import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { GameOptionType, ScreenProps } from '../types';
import { setGameOption } from '../features/game/gameSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import GameHeader from '../component/GameHeader';
import { Color } from '../assets/GlobalStyles';
import { heightScale, widthScale } from '../utils/Scaling';
import Text from '../component/DefaultText';

export default function GameSettingsScreen({ navigation }: ScreenProps) {
    const gameOption: GameOptionType = {
        difficulty: useAppSelector((state) => state.game.currentGameOption.difficulty),
        game: useAppSelector((state) => state.game.currentGame),
        passLimit: useAppSelector(state => state.game.currentGameOption.passLimit),
        playTime: useAppSelector((state) => state.game.currentGameOption.playTime),
        subject: useAppSelector((state) => state.game.currentGameSubject)
    };
    const [currentGameOption, setCurrentGameOption] = React.useState(gameOption);
    const dispatch = useAppDispatch();

    const addPassLimit = () => {
        if (currentGameOption.passLimit === 5) return;
        setCurrentGameOption({ ...currentGameOption, passLimit: currentGameOption.passLimit + 1 });
        dispatch(
            setGameOption({ ...currentGameOption, passLimit: currentGameOption.passLimit })
        );
    };

    const minusPassLimit = () => {
        if (currentGameOption.passLimit === 0) return;
        setCurrentGameOption({ ...currentGameOption, passLimit: currentGameOption.passLimit - 1 });
        dispatch(
            setGameOption({ ...currentGameOption, passLimit: currentGameOption.passLimit })
        );
    };

    const ViewEllipse = () => {
        return (
            <View style={styles.iconEllipseWrapper}>
                <Image
                    style={styles.iconEllipse}
                    resizeMode="contain"
                    source={require('../assets/icons/icon-ellipse.png')}
                />
                <Image
                    style={styles.iconEllipse}
                    resizeMode="contain"
                    source={require('../assets/icons/icon-ellipse.png')}
                />
            </View>
        );
    };

    return (
        <View className="flex-1 items-center justify-center"
              style={styles.container}
        >
            <GameHeader title={'플레이 설정'} isBack isPlaySetting={false} isTeamSetting={false} isRefreshSetting={false}
                        navigation={navigation} />

            <View style={styles.settingContainer}>
                <View style={styles.boxWrapper}>
                    <Text style={[styles.settingTitle, styles.titleWidth]}>레벨</Text>
                    <Text style={[styles.settingTitle, styles.divider]}>|</Text>
                    <View style={styles.settingWrapper}>
                        <TouchableOpacity onPress={() => {
                            setCurrentGameOption({ ...currentGameOption, difficulty: 'easy' });
                            dispatch(
                                setGameOption({ ...currentGameOption, difficulty: currentGameOption.difficulty })
                            );
                        }}>
                            <View
                                style={[styles.settingItemBox, currentGameOption.difficulty === 'easy' && styles.currentSettingItemBox]}>
                                <Text
                                    style={[styles.settingText, currentGameOption.difficulty === 'easy' && styles.currentSettingText]}>쉬움</Text>
                            </View>
                        </TouchableOpacity>

                        <ViewEllipse />

                        <TouchableOpacity onPress={() => {
                            setCurrentGameOption({ ...currentGameOption, difficulty: 'normal' });
                            dispatch(
                                setGameOption({ ...currentGameOption, difficulty: currentGameOption.difficulty })
                            );
                        }}>
                            <View
                                style={[styles.settingItemBox, currentGameOption.difficulty === 'normal' && styles.currentSettingItemBox]}>
                                <Text
                                    style={[styles.settingText, currentGameOption.difficulty === 'normal' && styles.currentSettingText]}>보통</Text>
                            </View>
                        </TouchableOpacity>

                        <ViewEllipse />

                        <TouchableOpacity onPress={() => {
                            setCurrentGameOption({ ...currentGameOption, difficulty: 'hard' });
                            dispatch(
                                setGameOption({ ...currentGameOption, difficulty: currentGameOption.difficulty })
                            );
                        }}>
                            <View
                                style={[styles.settingItemBox, currentGameOption.difficulty === 'hard' && styles.currentSettingItemBox]}>
                                <Text
                                    style={[styles.settingText, currentGameOption.difficulty === 'hard' && styles.currentSettingText]}>어려움</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.boxWrapper}>
                    <Text style={[styles.settingTitle, styles.titleWidth]}>플레이 시간</Text>
                    <Text style={[styles.settingTitle, styles.divider]}>|</Text>
                    <View style={styles.settingWrapper}>
                        <TouchableOpacity onPress={() => {
                            setCurrentGameOption({ ...currentGameOption, playTime: 30 });
                            dispatch(
                                setGameOption({ ...currentGameOption, playTime: currentGameOption.playTime })
                            );
                        }}>
                            <View
                                style={[styles.settingItemBox, currentGameOption.playTime === 30 && styles.currentSettingItemBox]}>
                                <Text
                                    style={[styles.settingText, currentGameOption.playTime === 30 && styles.currentSettingText]}>30초</Text>
                            </View>
                        </TouchableOpacity>

                        <ViewEllipse />

                        <TouchableOpacity onPress={() => {
                            setCurrentGameOption({ ...currentGameOption, playTime: 60 });
                            dispatch(
                                setGameOption({ ...currentGameOption, playTime: currentGameOption.playTime })
                            );
                        }}>
                            <View
                                style={[styles.settingItemBox, currentGameOption.playTime === 60 && styles.currentSettingItemBox]}>
                                <Text
                                    style={[styles.settingText, currentGameOption.playTime == 60 && styles.currentSettingText]}>60초</Text>
                            </View>
                        </TouchableOpacity>

                        <ViewEllipse />

                        <TouchableOpacity onPress={() => {
                            setCurrentGameOption({ ...currentGameOption, playTime: 90 });
                            dispatch(
                                setGameOption({ ...currentGameOption, playTime: currentGameOption.playTime })
                            );
                        }}>
                            <View
                                style={[styles.settingItemBox, currentGameOption.playTime === 90 && styles.currentSettingItemBox]}>
                                <Text
                                    style={[styles.settingText, currentGameOption.playTime === 90 && styles.currentSettingText]}>90초</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.boxWrapper}>
                    <Text style={[styles.settingTitle, styles.titleWidth]}>패스 기회</Text>
                    <Text style={[styles.settingTitle, styles.divider]}>|</Text>
                    <View style={styles.settingWrapper}>
                        <TouchableOpacity onPress={minusPassLimit}>
                            <View style={styles.settingItemBox}>
                                <Text style={styles.settingText}>-</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={[styles.settingItemBox, styles.currentSettingItemBox, {
                            marginHorizontal: heightScale(20),
                            width: widthScale(295)
                        }]}>
                            <Text
                                style={[styles.settingText, styles.currentSettingText, { textAlign: 'center' }]}>
                                {currentGameOption.passLimit}
                            </Text>
                        </View>

                        <TouchableOpacity onPress={addPassLimit}>
                            <View style={styles.settingItemBox}>
                                <Text style={styles.settingText}>+</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.buttonOuter}>
                <TouchableOpacity
                    style={styles.buttonWrapper}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}>설정완료</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.background,
        paddingHorizontal: widthScale(30)
    },
    settingContainer: {
        marginTop: heightScale(72)
    },
    boxWrapper: {
        marginBottom: heightScale(25),
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: heightScale(14),
        backgroundColor: '#5b5d5a',
        borderStyle: 'solid',
        borderColor: '#fff',
        borderWidth: 1,
        paddingVertical: heightScale(12),
        paddingLeft: widthScale(35),
        paddingRight: widthScale(25)
    },
    settingWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: widthScale(550)
    },
    settingTitle: {
        fontSize: heightScale(28),
        letterSpacing: heightScale(-0.3),
        fontWeight: '700',
        color: '#fff'
    },
    titleWidth: {
        width: widthScale(130)
    },
    divider: {
        fontWeight: '500',
        marginHorizontal: heightScale(50)
    },
    settingItemBox: {
        justifyContent: 'center',
        borderRadius: heightScale(24),
        backgroundColor: '#434642',
        borderStyle: 'solid',
        borderColor: '#fff',
        borderWidth: 1,
        paddingVertical: widthScale(22),
        paddingHorizontal: heightScale(42)
    },
    currentSettingItemBox: {
        shadowColor: '#13ff8e',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: heightScale(40),
        elevation: heightScale(40),
        shadowOpacity: 1,
        backgroundColor: '#13ff8e',
        borderColor: '#b7ffdd',
        borderWidth: heightScale(6)
    },
    settingText: {
        fontSize: heightScale(24),
        letterSpacing: heightScale(-0.2),
        fontWeight: '700',
        color: '#fff'
    },
    currentSettingText: {
        color: '#2c2f2b'
    },
    iconEllipseWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: heightScale(13),
        gap: heightScale(9)
    },
    iconEllipse: {
        width: heightScale(8),
        height: heightScale(8)
    },
    buttonOuter: {
        paddingHorizontal: heightScale(50),
        width: '100%'
    },
    buttonWrapper: {
        marginTop: heightScale(50),
        borderRadius: heightScale(16),
        backgroundColor: '#fff',
        borderStyle: 'solid',
        borderColor: '#b9bab9',
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: heightScale(344),
        paddingVertical: widthScale(28),
        width: '100%'
    },
    buttonText: {
        fontSize: heightScale(50),
        fontWeight: '700',
        color: '#2c2f2b',
        textAlign: 'center'
    }
});