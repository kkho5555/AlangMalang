import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { ScreenProps } from '../types';
import GameHeader from '../component/GameHeader';
import { Color, Padding } from '../assets/GlobalStyles';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
export default function PlayerSettingsScreen({ navigation }: ScreenProps) {
    const [currentTeam, setCurrentTeam] = React.useState(-1);

    const TeamList = [
        {
            name: '심연의 그린',
            selectColor: '#00BF63',
        },
        {
            name: '우아한 코랄',
            selectColor: '#FC7878',
        },
        {
            name: '진중한 블루',
            selectColor: '#109AFF',
        },
    ];

    const handlerSelectRandomTeam = () => {
        setCurrentTeam(-1);
    };
    const handlerSelectTeam = (index: number) => {
        setCurrentTeam(index);
    };

    const handlerStartGame = () => {
        navigation.navigate('InGame');
    }

    return (
        <View className="flex-1 items-center justify-center" style={styles.container}>
            <GameHeader title={'누가 플레이 하나요?'} navigation={navigation} isBack={true} isSetting={true} />

            <View style={styles.subContainer}>
                <TouchableOpacity onPress={handlerSelectRandomTeam}>
                    <View
                        style={[styles.randomWrapper, currentTeam === -1 && styles.selectRandomWrapper]}>
                        <Image resizeMode="cover" source={require('../assets/icons/icon-refresh.png')} />
                        <Text style={styles.randomText}>팀 랜덤선택</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.teamContainer}>
                    {TeamList.map((team, index) => (
                        <TouchableOpacity onPress={() => handlerSelectTeam(index)}>
                            <View
                                style={[styles.teamWrapper,
                                    currentTeam === index && {
                                        backgroundColor: TeamList[index].selectColor,
                                        shadowColor: TeamList[index].selectColor,
                                    },
                                    currentTeam === index && styles.selectTeamWrapper,
                                ]}>
                                {currentTeam === index && (
                                    <Image resizeMode="cover"
                                           source={require('../assets/icons/icon-circle-check.png')} />
                                )}
                                <Text style={styles.teamText}>{team.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity onPress={handlerStartGame}>
                    <View style={styles.startWrapper}>
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
        paddingHorizontal: 30,
        paddingTop: Padding.ContainerPaddingTop,
    },
    subContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 65,
    },
    randomWrapper: {
        flexDirection: 'row',
        borderRadius: 16,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#727471',
        marginBottom: 50,
    },
    selectRandomWrapper: {
        backgroundColor: '#FF0000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 20,
        elevation: 20,
        shadowOpacity: 1,
        shadowColor: '#FF0000',
    },
    randomText: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    teamContainer: {
        flexDirection: 'row',
    },
    teamWrapper: {
        padding: 80,
        width: 284,
        height: 274,
        backgroundColor: '#727471',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 18,
        borderRadius: 24,
        borderWidth: 3,
        borderColor: '#FFFFFF',
        borderStyle: 'solid',
    },
    selectTeamWrapper: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 20,
        elevation: 20,
        shadowOpacity: 1,
    },
    teamText: {
        fontSize: 40,
        marginTop: 10,
        textAlign: 'center',
        fontWeight: 'bold',
        flexWrap: 'wrap',
        color: '#FFFFFF',
    },
    startWrapper: {
        marginTop: 50,
        width: screenWidth * 0.8,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 28,
    },
    startText: {
        textAlign: 'center',
        color: '#2C2F2B',
        fontSize: 40,
        fontWeight: 'bold',
    },
});