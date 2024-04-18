import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import GameCard from './GameCard';
import { GameType, ScreenProps } from '../types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setGame, setGameOption } from '../features/game/gameSlice';
import { widthScale, heightScale } from '../utils/Scaling';

const { width } = Dimensions.get('window');

interface ICarousel {
    GameList: GameType[];
    navigation: ScreenProps['navigation'];
}

export default function GameCarousel({
    GameList: GameData,
    navigation
}: ICarousel) {
    const [currentGame, setCurrentGame] = useState<number>(0);
    const dispatch = useAppDispatch();
    const gameList = useAppSelector((state) => state.game.gameList);
    const currentGameState = useAppSelector((state) => state.game.currentGame);
    const currentGameSubjectState = useAppSelector(
        (state) => state.game.currentGameSubject
    );

    useEffect(() => {
        dispatch(
            setGameOption({
                difficulty: 'easy',
                game: currentGameState,
                passLimit: 3,
                playTime: 30,
                subject: currentGameSubjectState
            })
        );
        if (currentGame !== undefined && gameList[currentGame]) {
            dispatch(setGame(gameList[currentGame]));
        }
    }, [
        dispatch,
        currentGameState,
        currentGameSubjectState,
        currentGame,
        gameList
    ]);

    const onSnapToItem = (index: number) => {
        setCurrentGame(index);
    };

    return (
        <View className="flex justify-center items-center">
            <Carousel
                {...{ width: width / 3 }}
                style={{
                    width,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                loop
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50
                }}
                height={heightScale(473)}
                data={gameList}
                onSnapToItem={onSnapToItem}
                renderItem={({ index }) => (
                    <GameCard
                        item={gameList[index]}
                        navigation={navigation}
                        isActive={index === currentGame}
                    />
                )}
            />
            <Text className="text-white">{currentGame}</Text>
            <View style={styles.indicatorWrapper}>
                {GameData.map((item, index) => (
                    <View
                        key={`indicator_${index}`}
                        style={[
                            styles.indicator,
                            index === currentGame && styles.currentIndicator
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    indicatorWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: heightScale(16)
    },
    indicator: {
        marginHorizontal: widthScale(6),
        width: widthScale(12),
        height: widthScale(12),
        borderRadius: 999,
        backgroundColor: 'rgba(217, 217, 217, 0.5)'
    },
    currentIndicator: {
        width: widthScale(16),
        height: widthScale(16),
        backgroundColor: '#D9D9D9'
    }
});
