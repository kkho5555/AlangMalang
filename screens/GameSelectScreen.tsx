import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenProps } from '../types';
import GameCarousel from '../component/GameCarousel';
import { useAppSelector } from '../app/hooks';
import { Color, Padding } from '../assets/GlobalStyles';
import GameHeader from '../component/GameHeader';
import { heightScale } from '../utils/Scaling';

export default function GameSelectScreen({ navigation }: ScreenProps) {
    const gameList = useAppSelector((state) => state.game.gameList);

    const handlerTeamSetting = () => {
        console.log('handlerTeamSetting');
    };

    const handlerGameSetting = () => {
        console.log('handlerGameSetting');
    };

    return (
        <View
            className="flex-1 items-center justify-center"
            style={styles.container}
        >
            <GameHeader
                title="어떤 게임을 할까요?"
                isBack={false}
                isTeamSetting={false}
                navigation={navigation}
                isPlaySetting={false}
                isRefreshSetting={false}
            />

            <View style={styles.carouselWarp}>
                <View style={styles.carouselOuter}>
                    <GameCarousel GameList={gameList} navigation={navigation} />
                </View>
            </View>

            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('OverallRanking')}
                >
                    <View style={styles.rankContainer}>
                        <Text style={styles.rankTitleText}>전체 랭킹</Text>
                        <Text style={[styles.rankTitleText, styles.divider]}>
                            |
                        </Text>
                        <View style={styles.rankWrap}>
                            <LinearGradient
                                style={styles.rankOuter}
                                colors={['#ffa235', '#fff3b2']}
                            >
                                <Image
                                    style={styles.iconCrown}
                                    resizeMode="cover"
                                    source={require('../assets/icons/icon-crown.png')}
                                />
                                <Text style={styles.crownRankTitle}>1st</Text>
                            </LinearGradient>
                            <Text style={styles.rankText}>심연의 그린</Text>
                        </View>
                        <View style={styles.rankWrap}>
                            <LinearGradient
                                style={styles.rankOuter}
                                colors={['#D0D1D0', '#D0D1D0']}
                            >
                                <Image
                                    style={styles.iconCrown}
                                    resizeMode="cover"
                                    source={require('../assets/icons/icon-crown.png')}
                                />
                                <Text style={styles.crownRankTitle}>2nd</Text>
                            </LinearGradient>
                            <Text style={styles.rankText}>우아한 코랄</Text>
                        </View>
                        <View style={styles.rankWrap}>
                            <LinearGradient
                                style={styles.rankOuter}
                                colors={['#D0D1D0', '#D0D1D0']}
                            >
                                <Image
                                    style={styles.iconCrown}
                                    resizeMode="cover"
                                    source={require('../assets/icons/icon-crown.png')}
                                />
                                <Text style={styles.crownRankTitle}>3rd</Text>
                            </LinearGradient>
                            <Text style={styles.rankText}>진중한 블루</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.settingContainer}>
                    <TouchableOpacity onPress={handlerTeamSetting}>
                        <View style={styles.settingWrap}>
                            <View style={styles.iconWrap}>
                                <Image
                                    style={styles.iconPeople}
                                    resizeMode="contain"
                                    source={require('../assets/icons/icon-people.png')}
                                />
                            </View>
                            <Text style={styles.settingText}>팀 설정</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('GameSettings')}
                    >
                        <View
                            style={[styles.settingWrap, styles.gameSettingWrap]}
                        >
                            <View style={styles.iconWrap}>
                                <Image
                                    style={styles.iconSetting}
                                    resizeMode="contain"
                                    source={require('../assets/icons/icon-setting.png')}
                                />
                            </View>
                            <Text style={styles.settingText}>게임 설정</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Color.background,
        paddingTop: Padding.ContainerPaddingTop
    },
    mainText: {
        color: Color.mainText,
        textAlign: 'center',
        fontSize: heightScale(50),
        fontWeight: 'bold'
    },
    carouselOuter: {
        marginTop: heightScale(35),
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    carouselWarp: {
        alignItems: 'center'
    },
    bottomContainer: {
        marginTop: heightScale(40),
        paddingHorizontal: heightScale(40),
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    rankContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: heightScale(20),
        paddingVertical: heightScale(15),
        backgroundColor: '#434642',
        borderRadius: heightScale(8)
    },
    rankTitleText: {
        fontSize: heightScale(20),
        fontWeight: '600',
        color: '#898B89'
    },
    divider: {
        marginHorizontal: heightScale(16)
    },
    rankWrap: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rankOuter: {
        paddingHorizontal: heightScale(8),
        paddingVertical: heightScale(4),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 999
    },
    iconCrown: {
        width: heightScale(20),
        height: heightScale(16)
    },
    crownRankTitle: {
        fontSize: heightScale(16),
        letterSpacing: heightScale(-0.2),
        fontWeight: '500',
        marginLeft: heightScale(8)
    },
    rankText: {
        marginLeft: heightScale(8),
        marginRight: heightScale(16),
        fontWeight: '600',
        fontSize: heightScale(20),
        color: '#FFFFFF',
        letterSpacing: heightScale(-1)
    },
    settingContainer: {
        flexDirection: 'row'
    },
    settingWrap: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    gameSettingWrap: {
        marginLeft: heightScale(27)
    },
    iconWrap: {
        width: heightScale(38),
        height: heightScale(36),
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconPeople: {
        width: heightScale(38),
        height: heightScale(26)
    },
    iconSetting: {
        width: heightScale(34),
        height: heightScale(36)
    },
    settingText: {
        color: '#B9BAB9',
        fontWeight: '500',
        fontSize: heightScale(20),
        marginTop: heightScale(8)
    }
});
