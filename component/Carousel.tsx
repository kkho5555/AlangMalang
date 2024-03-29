import React, {useRef, useState} from "react";
import {Dimensions, FlatList, StyleSheet, Text, View} from "react-native";
import CurrentGameCard from "./CurrentGameCard";
import GameCard from "./GameCard";
import {ScreenProps} from "../types";


const {width} = Dimensions.get('window');
const ITEM_WIDTH = width / 3;

interface ICarousel {
    GameData: any[],
}

export default function Carousel({GameData}: ICarousel) {
    const flatListRef = useRef<FlatList>(null);
    const [currentGame, setCurrentGame] = useState(0);

    const renderItem = ({item, index}: any) => {
        const isCurrentGameCard = index === currentGame;
        return isCurrentGameCard ? (
            <CurrentGameCard item={item}/>
        ) : (
            <GameCard item={item}/>
        );
    };

    const onScrollBeginDrag = (e: any) => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const newIndex = Math.round(contentOffsetX / ITEM_WIDTH);
        setCurrentGame(newIndex);
    };

    const dynamicPadding = (width - ITEM_WIDTH) / 2;
    const centerOffset = (ITEM_WIDTH - dynamicPadding - 12) * currentGame;

    return (
        <View className="flex justify-center items-center">
            <FlatList
                ref={flatListRef}
                automaticallyAdjustContentInsets={false}
                contentContainerStyle={{paddingHorizontal: dynamicPadding - centerOffset}}
                data={GameData}
                decelerationRate="fast"
                horizontal
                keyExtractor={(item: any) => `game_${item.num}`}
                onScroll={onScrollBeginDrag}
                pagingEnabled
                renderItem={renderItem}
                initialScrollIndex={currentGame}
                snapToInterval={ITEM_WIDTH}
                snapToAlignment="start"
                showsHorizontalScrollIndicator={false}
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 16
    },
    indicator: {
        marginHorizontal: 6,
        width: 12,
        height: 12,
        borderRadius: 999,
        backgroundColor: 'rgba(217, 217, 217, 0.5)',
    },
    currentIndicator: {
        width: 16,
        height: 16,
        backgroundColor: '#D9D9D9',
    },

})