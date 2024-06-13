import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import 'react-native-get-random-values';
import * as Progress from 'react-native-progress';
import { v4 } from 'uuid';
import { login } from '../app/api';
import { useAppDispatch } from '../app/hooks';
import Text from '../component/DefaultText';
import { setGameList, setTeams } from '../features/game/gameSlice';
import { GameType, ScreenProps, TeamType } from '../types';
import { heightScale, widthScale } from '../utils/Scaling';
// @ts-ignore
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
export default function MainScreen({ navigation }: ScreenProps) {
    const [loading, setLoading] = React.useState(0);
    const [typoIndex, setTypoIndex] = React.useState(0);
    const typoList = [
        '게임을 불러오고 있습니다',
        '조금만 더 기다려 주세요',
        '혹시 날씨가 궁금하지는 않으세요?',
        "'냥씨알림'이라고 들어봤다냥?",
        '게임이 곧 시작됩니다'
    ];

    const dispatch = useAppDispatch();

    useEffect(() => {
        const interval = setInterval(async () => {
            if (loading < 1) {
                setTypoIndex(
                    (prevIndex) => (prevIndex + 1) % (typoList.length - 1)
                );
                if (loading > 0.8) {
                    setTypoIndex(typoList.length - 1);
                }
                setLoading((prevLoading) => prevLoading + 0.1);
            } else {
                clearInterval(interval);
                let uniqueId = '';
                if ((await AsyncStorage.getItem('userId')) === null) {
                    uniqueId = v4();
                    await AsyncStorage.setItem('userId', uniqueId);
                } else {
                    uniqueId = (await AsyncStorage.getItem('userId')) as string;
                }
                await login({ id: uniqueId }).then((res) => {
                    const gameList: GameType[] = [];
                    const teamList: TeamType[] = [];
                    res?.game.map((game) => {
                        const tmpGame: GameType = {
                            id: game.gameId,
                            bgColor1: '#00BF63',
                            bgColor2: '#87FFC5',
                            gameManual: {
                                participant: 'test',
                                tester: 'test'
                            },
                            headCount: {
                                min: 4,
                                max: 10
                            },
                            imgPath: '../assets/images/backgrounds/banana.png',
                            num: game.gameId,
                            title: game.gameName,
                            type: 'testGame'
                        };
                        gameList.push(tmpGame);
                    });
                    res?.team.map((team) => {
                        const tmpTeam: TeamType = {
                            id: team.teamId,
                            name: team.teamName,
                            teamColor: '#00BF63'
                        };
                        teamList.push(tmpTeam);
                    });
                    dispatch(setGameList(gameList));
                    dispatch(setTeams(teamList));
                });
                navigation.navigate('GameSelect');
            }
        }, 5);
        return () => clearInterval(interval);
    }, [loading]);

    return (
        <LinearGradient
            style={styles.container}
            colors={['#35AAFF', '#FFF3B2']}
        >
            <Image
                style={styles.images}
                resizeMode="contain"
                source={require('../assets/images/main-logo.png')}
            />
            {/* <TouchableOpacity */}
            {/*    style={styles.button} */}
            {/*    onPress={() => navigation.navigate('GameSelect')} */}
            {/* > */}

            {/*    <Text style={styles.buttonText}>눌러서 시작하기</Text> */}
            {/* </TouchableOpacity> */}
            <Progress.Bar
                animationType={'timing'}
                progress={loading}
                width={heightScale(855)}
                height={15}
                color="#00B9F5"
                borderRadius={999}
                unfilledColor="#FFFFFF"
                borderColor="transparent"
            />
            <Text style={styles.typo}>{typoList[typoIndex]}</Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    images: {
        width: widthScale(871),
        height: heightScale(376),
        marginBottom: heightScale(116)
    },
    typo: {
        marginTop: heightScale(20),
        fontSize: heightScale(20),
        letterSpacing: heightScale(-0.2),
        fontWeight: '600',
        color: '#727471'
    }
});
