import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { ScreenProps } from '../types';
import { useAppSelector } from '../app/hooks';
import { useDispatch } from 'react-redux';
import { pushGameResult, setGameResult } from '../features/game/gameSlice';

export default function InGameScreen({ navigation }: ScreenProps) {
    const dispatch = useDispatch();
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

    const getQuizWord = () => {
        const [easy, hard] = currentGameData.data;
        const easyWords = easy.words;
        const hardWords = hard.words;
        const random = Math.random();
        let randomIndex = 0;
        switch (difficulty) {
            case 'easy':
                randomIndex = Math.floor(Math.random() * easyWords.length);
                return easyWords[randomIndex];
            case 'normal':
                if (random < 0.7) {
                    randomIndex = Math.floor(Math.random() * easyWords.length);
                    return easyWords[randomIndex];
                }
                randomIndex = Math.floor(Math.random() * hardWords.length);
                return hardWords[randomIndex];
            case 'hard':
                if (random < 0.4) {
                    randomIndex = Math.floor(Math.random() * easyWords.length);
                    return easyWords[randomIndex];
                }
                randomIndex = Math.floor(Math.random() * hardWords.length);
                return hardWords[randomIndex];
            default:
                return '';
        }
    };

    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (startCounter > 0) {
            timer = setInterval(() => {
                setStartCounter((prev) => prev - 1);
            }, 1000);
        } else if (startCounter === 0 && !isPaused && gameTime > 0) {
            setIsGameActive(true);
            currentWord === '' && setCurrentWord(getQuizWord());
            timer = setInterval(() => {
                setGameTime((prev) => prev - 1);
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
        setCurrentWord(getQuizWord()); // Get next word
    };

    const handlePass = () => {
        if (passesLeft > 0) {
            setCurrentWord(getQuizWord());
            setPassesLeft((prev) => prev - 1);
        }
    };
    const handleRestart = () => {
        setGameTime(playTime);
        setCorrectAnswers(0);
        setPassesLeft(passLimit);
        setIsPaused(false);
        setIsGameActive(false);
        setCurrentWord(getQuizWord());
        setStartCounter(3);
    };

    const handleQuit = () => {
        navigation.navigate('SubjectSelect');
        setIsGameActive(false);
    };

    const handleEndGame = () => {
        dispatch(
            setGameResult({
                game: currentGame,
                subject: currentGameSubject,
                option: currentGameOption,
                score: correctAnswers,
                playedAt: new Date()
            })
        );
        dispatch(
            pushGameResult({
                teamId: currentTeam.id,
                result: currentGameResult
            })
        );
        navigation.navigate('EndGame');
    };

    return (
        <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
            <Text style={{ fontWeight: 'bold' }}>InGame Screen</Text>
            <Text>남은시간 : {gameTime}초</Text>
            {!isGameActive && startCounter > 0 && <Text>{startCounter}</Text>}
            {isGameActive && (
                <>
                    <Text style={{ fontWeight: 'bold' }}>{currentWord}</Text>
                    <Button title="정답" onPress={handleCorrectAnswer} />
                    <Button
                        title={`패스 ${passesLeft} / ${passLimit}`}
                        onPress={handlePass}
                        disabled={passesLeft === 0}
                    />
                    <Text>점수: {correctAnswers}</Text>
                    {!isPaused && (
                        <Button title="일시정지" onPress={handlePause} />
                    )}
                </>
            )}
            {isPaused && (
                <>
                    <Button title="이어하기" onPress={handleResume} />
                    <Button title="다시하기" onPress={handleRestart} />
                    <Button title="그만두기" onPress={handleQuit} />
                </>
            )}
            <Button title="Go to EndGame" onPress={handleEndGame} />
        </View>
    );
}
