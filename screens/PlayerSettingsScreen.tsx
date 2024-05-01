import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ScreenProps } from '../types';
import GameHeader from '../component/GameHeader';
import { Color, Padding } from '../assets/GlobalStyles';
import { widthScale, heightScale, moderateScale } from '../utils/Scaling';
import { useAppSelector } from '../app/hooks';
import Text from '../component/DefaultText';
export default function PlayerSettingsScreen({ navigation }: ScreenProps) {
    const [currentTeamState, setCurrentTeamState] = React.useState(-1);
    const [isSelectingRandomTeam, setIsSelectingRandomTeam] =
        React.useState(false);

    const currentTeam = useAppSelector((state) => state.team.currentTeam);

    const TeamList = [
        {
            id: '1',
            name: '심연의 그린',
            selectColor: '#00BF63'
        },
        {
            id: '2',
            name: '우아한 코랄',
            selectColor: '#FC7878'
        },
        {
            id: '3',
            name: '진중한 블루',
            selectColor: '#109AFF'
        }
    ];

    const selectRandomTeam = () => {
        setIsSelectingRandomTeam(true);

        let prevIndex = currentTeamState;
        const interval = setInterval(() => {
            let randomIndex = Math.floor(Math.random() * TeamList.length);

            while (randomIndex === prevIndex) {
                randomIndex = Math.floor(Math.random() * TeamList.length);
            }

            setCurrentTeamState(randomIndex);
            prevIndex = randomIndex;
        }, 150);

        setTimeout(() => {
            clearInterval(interval);
            setIsSelectingRandomTeam(false);
        }, 2000);
    };

    const handlerSelectRandomTeam = () => {
        if (!isSelectingRandomTeam) {
            selectRandomTeam();
        }
    };

    const handlerSelectTeam = (index: number) => {
        if (!isSelectingRandomTeam) {
            setCurrentTeamState(index);
            // setTeam(TeamList[index]);
        }
    };

    const handlerStartGame = () => {
        if (!isSelectingRandomTeam && currentTeamState > -1) {
            navigation.navigate('InGame');
        }
    };

    return (
        <View
            className="flex-1 items-center justify-center"
            style={styles.container}
        >
            <GameHeader
                title="누가 플레이 하나요?"
                navigation={navigation}
                isBack
                isTeamSetting
                isPlaySetting={false}
                isRefreshSetting={false}
            />

            <View style={styles.subContainer}>
                <TouchableOpacity
                    onPress={handlerSelectRandomTeam}
                    disabled={isSelectingRandomTeam}
                >
                    <View style={[styles.randomWrapper]}>
                        <Image
                            resizeMode="contain"
                            style={styles.iconRefresh}
                            source={require('../assets/icons/icon-refresh.png')}
                        />
                        <Text style={styles.randomText}>팀 랜덤선택</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.teamContainer}>
                    {TeamList.map((team, index) => (
                        <TouchableOpacity
                            onPress={() => handlerSelectTeam(index)}
                            key={index}
                        >
                            <View
                                style={[
                                    styles.teamWrapper,
                                    currentTeamState === index && {
                                        backgroundColor:
                                            TeamList[index].selectColor,
                                        shadowColor: TeamList[index].selectColor
                                    },
                                    currentTeamState === index &&
                                        styles.selectTeamWrapper
                                ]}
                                key={index}
                            >
                                {currentTeamState === index && (
                                    <Image
                                        resizeMode="cover"
                                        style={styles.iconCheck}
                                        source={require('../assets/icons/icon-circle-check.png')}
                                    />
                                )}
                                <Text style={styles.teamText}>{team.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity onPress={handlerStartGame}>
                    <View
                        style={[
                            styles.startWrapper,
                            currentTeamState > -1 &&
                                !isSelectingRandomTeam &&
                                styles.selectStartWrapper
                        ]}
                    >
                        <Text style={styles.startText}>시작하기</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Color.background,
        paddingHorizontal: widthScale(30),
        paddingTop: Padding.ContainerPaddingTop
    },
    subContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: heightScale(65)
    },
    randomWrapper: {
        flexDirection: 'row',
        borderRadius: heightScale(16),
        paddingVertical: heightScale(8),
        paddingHorizontal: heightScale(16),
        backgroundColor: '#727471',
        marginBottom: heightScale(50)
    },
    iconRefresh: {
        width: heightScale(40),
        height: heightScale(40)
    },
    selectRandomWrapper: {
        backgroundColor: '#FF0000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: heightScale(20),
        elevation: heightScale(20),
        shadowOpacity: 1,
        shadowColor: '#FF0000'
    },
    randomText: {
        color: '#FFFFFF',
        fontSize: heightScale(30),
        fontWeight: '600',
        marginLeft: heightScale(20)
    },
    teamContainer: {
        flexDirection: 'row'
    },
    teamWrapper: {
        width: widthScale(284),
        height: heightScale(274),
        backgroundColor: '#727471',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: heightScale(18),
        borderRadius: heightScale(24),
        borderWidth: heightScale(3),
        borderColor: '#FFFFFF',
        borderStyle: 'solid'
    },
    selectTeamWrapper: {
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: heightScale(20),
        elevation: heightScale(20),
        shadowOpacity: 1
    },
    iconCheck: {
        width: heightScale(40),
        height: heightScale(40)
    },
    teamText: {
        fontSize: heightScale(40),
        marginTop: heightScale(10),
        textAlign: 'center',
        fontWeight: '600',
        flexWrap: 'wrap',
        color: '#FFFFFF'
    },
    startWrapper: {
        marginTop: heightScale(50),
        width: widthScale(926),
        backgroundColor: '#434642',
        borderRadius: heightScale(16),
        paddingVertical: heightScale(28)
    },
    selectStartWrapper: {
        backgroundColor: '#FFFFFF'
    },
    startText: {
        textAlign: 'center',
        color: '#2C2F2B',
        fontSize: heightScale(40),
        fontWeight: '600'
    }
});
