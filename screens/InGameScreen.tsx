// InGameScreen.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { endGame, startGame } from '../app/api';
import { EndGameRequest, StartGameResponse } from '../app/api.d';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Text from '../component/DefaultText';
import { ScreenProps } from '../types';
import { heightScale, widthScale } from '../utils/Scaling';

const backGroundColorList = [
    ['#35aaff', '#fff3b2'],
    ['#14D64A', '#F9FFB8'],
    ['#FF3565', '#FFCBC4']
];

export default function InGameScreen({ navigation }: ScreenProps) {
    const dispatch = useAppDispatch();
    const currentGameOption = useAppSelector(
        (state) => state.game.currentGameOption
    );
    const { difficulty, playTime, passLimit } = currentGameOption;
    const currentGameData = useAppSelector(
        (state) => state.game.currentGameData
    );
    const currentGame = useAppSelector((state) => state.game.currentGame);
    const currentGameSubject = useAppSelector(
        (state) => state.game.currentGameSubject
    );
    const currentTeam = useAppSelector((state) => state.game.currentTeam);
    const currentGameResult = useAppSelector(
        (state) => state.game.currentGameResult
    );

    const [startCounter, setStartCounter] = useState(3); // Initial countdown state
    const [gameTime, setGameTime] = useState(playTime);
    const [currentWord, setCurrentWord] = useState('');
    const [passesLeft, setPassesLeft] = useState(passLimit);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [isGameActive, setIsGameActive] = useState(false);
    const [isPaused, setIsPaused] = useState(false); // 추가된 일시정지 상태

    const [backGroundColorIndex, setBackGroundColorIndex] = useState(0);

    let words: StartGameResponse[] = [];
    const getQuizWord = async () => {
        if (words.length === 0) {
            words = (await startGame(currentGame.id, difficulty)) || [];
        }
        const index = Math.floor(Math.random() * words.length);
        const word = words[index].topicDataName;
        words.splice(index, 1);
        return word;
    };

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (startCounter > 0) {
            timer = setInterval(async () => {
                setStartCounter((prev) => prev - 1);
            }, 1000);
        } else if (startCounter === 0 && !isPaused && gameTime > 0) {
            setIsGameActive(true);
            if (currentWord === '') {
                getQuizWord().then(setCurrentWord);
            }
            timer = setInterval(() => {
                setGameTime((prev) => prev - 1);

                if (gameTime === Math.floor((playTime * 2) / 3)) {
                    setBackGroundColorIndex(1);
                } else if (gameTime === Math.floor(playTime / 3)) {
                    setBackGroundColorIndex(2);
                }
            }, 1000);
        } else if (gameTime === 0) {
            setIsGameActive(false);
            handleEndGame();
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, [startCounter, isPaused, gameTime]);

    const handlePause = () => {
        setIsPaused(true);
    };

    const handleResume = () => {
        setIsPaused(false);
    };

    const handleCorrectAnswer = () => {
        setCorrectAnswers((prev) => prev + 1);
        getQuizWord().then(setCurrentWord);
    };

    const handlePass = () => {
        if (passesLeft > 0) {
            getQuizWord().then(setCurrentWord);
            setPassesLeft((prev) => prev - 1);
        }
    };

    const handleRestart = () => {
        setGameTime(playTime);
        setCorrectAnswers(0);
        setPassesLeft(passLimit);
        setIsPaused(false);
        setIsGameActive(false);
        getQuizWord().then(setCurrentWord);
        setStartCounter(3);
        setBackGroundColorIndex(0);
    };

    const handleQuit = () => {
        navigation.navigate('SubjectSelect');
        setIsGameActive(false);
    };

    const handleEndGame = () => {
        const setGameResult = async () => {
            const data: EndGameRequest = {
                gameId: currentGame.id,
                teamId: currentTeam.id,
                score: correctAnswers,
                level: difficulty,
                playTime: playTime,
                setPass: passLimit - passesLeft,
                topicId: currentGameSubject.game.id,
                usePass: passLimit - passesLeft,
                userId: (await AsyncStorage.getItem('userId')) as string
            };
            const gameResult = await endGame(data);
            console.log('gameResult', gameResult, data);
            navigation.navigate('EndGame');
        };
        setGameResult();
    };

    return (
        <View style={styles.container}>
            <View style={styles.timerContainer}>
                <View style={styles.timerWrapper}>
                    <Image
                        style={styles.timerIcon}
                        resizeMode="contain"
                        source={require('../assets/icons/icon-clock.png')}
                    />
                    <Text style={styles.timerText}>{gameTime}s</Text>
                </View>

                <View style={styles.timerLinearWrapper}>
                    <Progress.Bar
                        width={widthScale(900)}
                        height={heightScale(18)}
                        borderRadius={999}
                        animationType={'timing'}
                        unfilledColor="#898b89"
                        color={backGroundColorList[backGroundColorIndex][0]}
                        progress={gameTime / playTime}
                        borderColor="transparent"
                    />
                </View>

                <TouchableOpacity onPress={handlePause}>
                    <View style={styles.pauseWrapper}>
                        <Image
                            style={styles.pauseIcon}
                            resizeMode="contain"
                            source={require('../assets/icons/icon-pause.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.mainContainer}>
                <LinearGradient
                    style={styles.gameContainer}
                    colors={backGroundColorList[backGroundColorIndex]}
                >
                    {!isGameActive && startCounter > 0 && (
                        <View style={styles.gameWrapper}>
                            <View style={styles.teamWrapper}>
                                <Image
                                    style={styles.teamIcon}
                                    resizeMode="contain"
                                    source={require('../assets/icons/icon-team.png')}
                                />
                                <Text style={styles.teamText}>
                                    {currentTeam.name}
                                </Text>
                            </View>
                            <View style={styles.gameTextWrapper}>
                                <Text style={styles.countDownText}>
                                    {startCounter}
                                </Text>
                            </View>
                        </View>
                    )}
                    {isGameActive && (
                        <View style={styles.gameWrapper}>
                            <View style={styles.gameTextWrapper}>
                                <Text style={styles.questionText}>
                                    {currentWord}
                                </Text>
                            </View>
                        </View>
                    )}
                </LinearGradient>

                <View style={styles.manageContainer}>
                    <View style={styles.manageWrapper}>
                        <View style={styles.manageTeamWrapper}>
                            <Text style={styles.manageTeamText}>
                                {currentTeam.name}
                            </Text>
                        </View>

                        <Text style={styles.currentText}>맞춘 문제</Text>

                        <Text style={styles.currentAnswerText}>
                            {correctAnswers}
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={handlePass}
                        disabled={passesLeft === 0}
                    >
                        <View style={styles.passWrapper}>
                            <Text style={styles.passText}>패스</Text>
                            <Text style={styles.passLeftText}>
                                {passesLeft} / {passLimit}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleCorrectAnswer}>
                        <View style={styles.answerWrapper}>
                            <Text style={styles.answerText}>정답</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                statusBarTranslucent
                animationType="fade"
                transparent
                visible={isPaused}
                onRequestClose={() => setIsPaused(false)}
            >
                <View style={styles.modalBackGround}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>게임 일시중지</Text>

                        <View style={styles.modalHandlerWrapper}>
                            <TouchableOpacity onPress={handleResume}>
                                <View
                                    style={[
                                        styles.handlerWrapper,
                                        { backgroundColor: '#109aff' }
                                    ]}
                                >
                                    <Image
                                        style={styles.modalIcon}
                                        resizeMode="contain"
                                        source={require('../assets/icons/icon-arrow-right.png')}
                                    />
                                    <Text style={styles.handlerText}>
                                        이어하기
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleRestart}>
                                <View
                                    style={[
                                        styles.handlerWrapper,
                                        { backgroundColor: '#00bf63' }
                                    ]}
                                >
                                    <Image
                                        style={styles.modalIcon}
                                        resizeMode="contain"
                                        source={require('../assets/icons/icon-refresh.png')}
                                    />
                                    <Text style={styles.handlerText}>
                                        다시하기
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleQuit}>
                                <View
                                    style={[
                                        styles.handlerWrapper,
                                        { backgroundColor: '#fa7777' }
                                    ]}
                                >
                                    <Image
                                        style={styles.modalIcon}
                                        resizeMode="contain"
                                        source={require('../assets/icons/icon-out.png')}
                                    />
                                    <Text style={styles.handlerText}>
                                        그만하기
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/*<Button title="Go to EndGame" onPress={handleEndGame} />*/}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#434642',
        paddingTop: heightScale(40),
        paddingHorizontal: widthScale(40),
        paddingBottom: heightScale(24)
    },
    timerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: widthScale(35),
        marginBottom: heightScale(40)
    },
    timerWrapper: {
        flexDirection: 'row',
        gap: widthScale(5)
    },
    timerIcon: {
        width: heightScale(32),
        height: heightScale(32)
    },
    timerText: {
        fontSize: heightScale(24),
        fontWeight: '700',
        color: '#f3f3f3'
    },
    timerLinearWrapper: {
        flex: 1
    },
    pauseWrapper: {
        borderRadius: 9999,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderColor: '#f3f3f3',
        borderWidth: heightScale(3),
        paddingHorizontal: heightScale(13),
        paddingVertical: heightScale(10)
    },
    pauseIcon: {
        width: heightScale(14),
        height: heightScale(20)
    },
    mainContainer: {
        flex: 1,
        flexDirection: 'row',
        gap: widthScale(14)
    },
    gameContainer: {
        flex: 1,
        padding: heightScale(9),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: heightScale(16)
    },
    gameWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#141713',
        borderRadius: heightScale(12)
    },
    teamWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: widthScale(20),
        borderRadius: heightScale(16),
        backgroundColor: '#2c2f2b',
        paddingHorizontal: widthScale(16),
        paddingVertical: heightScale(8)
    },
    teamIcon: {
        width: heightScale(38),
        height: heightScale(26)
    },
    teamText: {
        textAlign: 'center',
        fontSize: heightScale(40),
        letterSpacing: heightScale(-0.4),
        fontWeight: '600',
        color: '#fff'
    },
    gameTextWrapper: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    countDownText: {
        fontSize: heightScale(200),
        letterSpacing: heightScale(-2),
        fontWeight: '300',
        color: '#fff'
    },
    questionText: {
        fontSize: heightScale(100),
        fontWeight: '900',
        color: '#fff'
    },
    manageContainer: {
        width: widthScale(175),
        gap: heightScale(18)
    },
    manageWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: heightScale(16),
        backgroundColor: '#2c2f2b',
        gap: widthScale(10),
        height: heightScale(160)
    },
    manageTeamWrapper: {
        borderRadius: heightScale(4),
        backgroundColor: '#5b5d5a',
        alignItems: 'center',
        paddingHorizontal: widthScale(16),
        paddingVertical: heightScale(4)
    },
    manageTeamText: {
        fontSize: heightScale(16),
        letterSpacing: heightScale(-0.2),
        fontWeight: '500',
        color: '#ffffff'
    },
    currentText: {
        fontSize: heightScale(20),
        letterSpacing: heightScale(-0.2),
        fontWeight: '500',
        color: '#ffffff'
    },
    currentAnswerText: {
        fontSize: heightScale(36),
        letterSpacing: heightScale(-0.4),
        fontWeight: '500',
        color: '#ffffff'
    },
    passWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: heightScale(16),
        backgroundColor: 'rgba(252, 120, 120, 0.99)',
        borderStyle: 'solid',
        borderColor: '#ffffff',
        borderWidth: heightScale(3),
        height: heightScale(180),
        gap: widthScale(10)
    },
    passText: {
        fontSize: heightScale(50),
        color: '#ffffff',
        fontWeight: '500'
    },
    passLeftText: {
        fontSize: heightScale(36),
        letterSpacing: heightScale(-0.4),
        color: '#ffffff',
        fontWeight: '500'
    },
    answerWrapper: {
        borderRadius: heightScale(16),
        backgroundColor: '#109aff',
        borderStyle: 'solid',
        borderColor: '#ffffff',
        borderWidth: heightScale(3),
        height: heightScale(290),
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    answerText: {
        fontSize: heightScale(50),
        fontWeight: '500',
        color: '#ffffff'
    },
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(67, 70, 66, 0.5)'
    },
    modalContainer: {
        alignItems: 'center',
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        shadowOffset: {
            width: 0,
            height: 4
        },
        marginVertical: heightScale(40),
        marginHorizontal: widthScale(65),
        shadowRadius: heightScale(20),
        elevation: heightScale(20),
        shadowOpacity: 1,
        backgroundColor: 'rgba(20, 23, 19, 0.9)',
        borderColor: '#727471',
        flex: 1,
        borderWidth: heightScale(2),
        borderStyle: 'solid',
        borderRadius: heightScale(16),
        paddingTop: heightScale(45)
    },
    modalText: {
        fontSize: heightScale(48),
        letterSpacing: heightScale(-0.5),
        fontWeight: '700',
        color: '#f3f3f3'
    },
    modalHandlerWrapper: {
        marginTop: heightScale(110),
        gap: heightScale(48)
    },
    handlerWrapper: {
        flexDirection: 'row',
        gap: widthScale(10),
        borderRadius: heightScale(16),
        borderStyle: 'solid',
        borderColor: '#fff',
        borderWidth: heightScale(2),
        paddingHorizontal: widthScale(184),
        paddingVertical: heightScale(25)
    },
    modalIcon: {
        width: heightScale(40),
        height: heightScale(40)
    },
    handlerText: {
        fontSize: heightScale(40),
        letterSpacing: heightScale(-0.4),
        fontWeight: '600',
        color: '#ffffff'
    }
});
