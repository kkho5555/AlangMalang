import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import GameCard from './GameCard';
import { GameType, ScreenProps } from '../types';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setGame, setGameOption } from '../features/game/gameSlice';
import { widthScale, heightScale, moderateScale } from '../utils/Scaling';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

interface ICarousel {
    GameData: GameType[];
    navigation: ScreenProps['navigation'];
}

export default function GameCarousel({ GameData, navigation }: ICarousel) {
    const [currentGame, setCurrentGame] = useState(0);
    const dispatch = useAppDispatch();
    const gameList = useAppSelector((state) => state.gameList);

    dispatch(
        setGameOption({
            difficulty: 'easy',
            game: useAppSelector((state) => state.currentGame),
            passLimit: 3,
            playTime: 30,
            subject: useAppSelector((state) => state.currentGameSubject),
        }),
    );

    const renderItem = ({ item, index }: any) => {
        return (
            <GameCard item={item} navigation={navigation} isActive={index === currentGame} />
        );
    };

    const onSnapToItem = (index: number) => {
        setCurrentGame(index);
        setGame(gameList[index]);
    };

    const baseOptions = {
        width: width / 3,
    };

    return (
        <View className="flex justify-center items-center">
            <Carousel
                {...baseOptions}
                style={{
                    width: width,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                loop
                mode={'parallax'}
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                }}
                height={heightScale(473)}
                data={gameList}
                onSnapToItem={onSnapToItem}
                renderItem={({ index }) => (
                    renderItem({ item: gameList[index], index })
                )}
            />
            <View style={styles.indicatorWrapper}>
                {GameData.map((item, index) => (
                    <View
                        key={`indicator_${index}`}
                        style={[
                            styles.indicator,
                            index === currentGame && styles.currentIndicator,
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
        marginTop: heightScale(16),
    },
    indicator: {
        marginHorizontal: widthScale(6),
        width: widthScale(12),
        height: widthScale(12),
        borderRadius: 999,
        backgroundColor: 'rgba(217, 217, 217, 0.5)',
    },
    currentIndicator: {
        width: widthScale(16),
        height: widthScale(16),
        backgroundColor: '#D9D9D9',
    },
});
