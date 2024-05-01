import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Pressable } from 'react-native';
import { ScreenProps } from '../types';
import GameHeader from '../component/GameHeader';
import { Color, Padding } from '../assets/GlobalStyles';
import { heightScale, moderateScale, widthScale } from '../utils/Scaling';
import ScoreDetail from '../component/modal/ScoreDetail';

export default function EndGameScreen({ navigation }: ScreenProps) {
    const [detailModalVisible, setDetailModalVisible] = useState(false);

    const RankDataList = [
        {
            teamName: '심연의 그린',
            teamColor: '#00BF63',
            teamBorderColor: '#87FFC5',
            playGame: 8,
            totalScore: 50
        },
        {
            teamName: '진중한 블루',
            teamColor: '#109AFF',
            teamBorderColor: '#85CBFF',
            playGame: 10,
            totalScore: 45
        },
        {
            teamName: '우아한 코랄',
            teamColor: '#FC7878',
            teamBorderColor: '#FDBBBB',
            playGame: 7,
            totalScore: 30
        },
        {
            teamName: '청초한 레드',
            teamColor: '#FC7878',
            teamBorderColor: '#FDBBBB',
            playGame: 8,
            totalScore: 27
        },
        {
            teamName: '차분한 블랙',
            teamColor: '#FC7878',
            teamBorderColor: '#FDBBBB',
            playGame: 9,
            totalScore: 18
        },
        {
            teamName: '정렬의 옐로',
            teamColor: '#FC7878',
            teamBorderColor: '#FDBBBB',
            playGame: 10,
            totalScore: 8
        }
    ];

    const handlerDetailModal = () => {
        setDetailModalVisible(true);
    };

    return (
        <>
            <View
                className="flex-1 items-center justify-center"
                style={styles.container}
            >
                <GameHeader
                    title="전체 랭킹"
                    navigation={navigation}
                    isBack
                    isTeamSetting={false}
                    isPlaySetting={false}
                    isRefreshSetting
                />

                <View style={{ flex: 1 }}>
                    <View style={styles.rankContainer}>
                        <Pressable onPress={handlerDetailModal}>
                            <View
                                style={[
                                    styles.rankWrapper,
                                    styles.secondContainer,
                                    {
                                        backgroundColor:
                                            RankDataList[1].teamColor,
                                        borderColor:
                                            RankDataList[1].teamBorderColor,
                                        shadowColor:
                                            RankDataList[1].teamBorderColor
                                    }
                                ]}
                            >
                                <View style={styles.rankTopWrap}>
                                    <Image
                                        style={styles.iconRank}
                                        resizeMode="contain"
                                        source={require('../assets/icons/icon-crown-rank.png')}
                                    />
                                    <Text style={styles.rankText}>2</Text>
                                </View>

                                <View style={styles.rankBottomWrap}>
                                    <Text style={styles.teamNameText}>
                                        {RankDataList[1].teamName}
                                    </Text>

                                    <View style={styles.scoreWrap}>
                                        <View style={styles.scoreTextWrap}>
                                            <Text style={styles.scoreTitleText}>
                                                플레이 게임
                                            </Text>
                                            <Text style={styles.scoreText}>
                                                {RankDataList[1].playGame}
                                            </Text>
                                        </View>
                                        <View style={styles.lineViewWrap}>
                                            <View style={styles.lineView} />
                                        </View>
                                        <View style={styles.scoreTextWrap}>
                                            <Text style={styles.scoreTitleText}>
                                                총 점수
                                            </Text>
                                            <Text style={styles.scoreText}>
                                                {RankDataList[1].totalScore}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Pressable>
                        <Pressable onPress={handlerDetailModal}>
                            <View
                                style={[
                                    styles.rankWrapper,
                                    styles.firstContainer,
                                    {
                                        backgroundColor:
                                            RankDataList[0].teamColor,
                                        borderColor:
                                            RankDataList[0].teamBorderColor,
                                        shadowColor:
                                            RankDataList[0].teamBorderColor
                                    }
                                ]}
                            >
                                <View style={styles.rankTopWrap}>
                                    <Image
                                        style={styles.iconRank}
                                        resizeMode="contain"
                                        source={require('../assets/icons/icon-crown-rank.png')}
                                    />
                                    <Text style={styles.rankText}>1</Text>
                                </View>

                                <View style={styles.rankBottomWrap}>
                                    <Text style={styles.teamNameText}>
                                        {RankDataList[0].teamName}
                                    </Text>

                                    <View style={styles.scoreWrap}>
                                        <View style={styles.scoreTextWrap}>
                                            <Text style={styles.scoreTitleText}>
                                                플레이 게임
                                            </Text>
                                            <Text style={styles.scoreText}>
                                                {RankDataList[0].playGame}
                                            </Text>
                                        </View>
                                        <View style={styles.lineViewWrap}>
                                            <View style={styles.lineView} />
                                        </View>
                                        <View style={styles.scoreTextWrap}>
                                            <Text style={styles.scoreTitleText}>
                                                총 점수
                                            </Text>
                                            <Text style={styles.scoreText}>
                                                {RankDataList[0].totalScore}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Pressable>
                        <Pressable onPress={handlerDetailModal}>
                            <View
                                style={[
                                    styles.rankWrapper,
                                    styles.thirdContainer,
                                    {
                                        backgroundColor:
                                            RankDataList[2].teamColor,
                                        borderColor:
                                            RankDataList[2].teamBorderColor,
                                        shadowColor:
                                            RankDataList[2].teamBorderColor
                                    }
                                ]}
                            >
                                <View style={styles.rankTopWrap}>
                                    <Image
                                        style={styles.iconRank}
                                        resizeMode="contain"
                                        source={require('../assets/icons/icon-crown-rank.png')}
                                    />
                                    <Text style={styles.rankText}>3</Text>
                                </View>

                                <View style={styles.rankBottomWrap}>
                                    <Text style={styles.teamNameText}>
                                        {RankDataList[2].teamName}
                                    </Text>

                                    <View style={styles.scoreWrap}>
                                        <View style={styles.scoreTextWrap}>
                                            <Text style={styles.scoreTitleText}>
                                                플레이 게임
                                            </Text>
                                            <Text style={styles.scoreText}>
                                                {RankDataList[2].playGame}
                                            </Text>
                                        </View>
                                        <View style={styles.lineViewWrap}>
                                            <View style={styles.lineView} />
                                        </View>
                                        <View style={styles.scoreTextWrap}>
                                            <Text style={styles.scoreTitleText}>
                                                총 점수
                                            </Text>
                                            <Text style={styles.scoreText}>
                                                {RankDataList[2].totalScore}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Pressable>
                    </View>

                    <View style={styles.rankTableContainer}>
                        <View style={styles.rankTableHeader}>
                            <View style={{ flex: 10 }}>
                                <Text style={styles.rankTableHeaderText}>
                                    순위
                                </Text>
                            </View>
                            <View style={{ flex: 20 }}>
                                <Text style={styles.rankTableHeaderText}>
                                    팀
                                </Text>
                            </View>
                            <View style={{ flex: 50 }}>
                                <Text style={styles.rankTableHeaderText}>
                                    플레이 게임
                                </Text>
                            </View>
                            <View style={{ flex: 20 }}>
                                <Text style={styles.rankTableHeaderText}>
                                    총 점수
                                </Text>
                            </View>
                        </View>

                        <View>
                            {RankDataList.slice(3).map((item, index) => {
                                return (
                                    <Pressable
                                        onPress={handlerDetailModal}
                                        key={index}
                                    >
                                        <View style={styles.rankTableContent}>
                                            <View style={{ flex: 10 }}>
                                                <Text
                                                    style={
                                                        styles.rankTableContentText
                                                    }
                                                >
                                                    {index + 4}
                                                </Text>
                                            </View>
                                            <View style={{ flex: 20 }}>
                                                <Text
                                                    style={
                                                        styles.rankTableContentText
                                                    }
                                                >
                                                    {item.teamName}
                                                </Text>
                                            </View>
                                            <View style={{ flex: 50 }}>
                                                <Text
                                                    style={
                                                        styles.rankTableContentText
                                                    }
                                                >
                                                    {item.playGame}
                                                </Text>
                                            </View>
                                            <View style={{ flex: 20 }}>
                                                <Text
                                                    style={
                                                        styles.rankTableContentText
                                                    }
                                                >
                                                    {item.totalScore}
                                                </Text>
                                            </View>
                                        </View>
                                    </Pressable>
                                );
                            })}
                        </View>
                    </View>
                </View>
            </View>
            <ScoreDetail
                modalVisible={detailModalVisible}
                setModalVisible={setDetailModalVisible}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: widthScale(30),
        backgroundColor: Color.background,
        paddingTop: Padding.ContainerPaddingTop
    },
    rankContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: heightScale(40),
        gap: widthScale(24)
    },
    rankWrapper: {
        justifyContent: 'space-between',
        width: widthScale(170),
        borderRadius: heightScale(16),
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: heightScale(16),
        elevation: heightScale(16),
        shadowOpacity: 1,
        borderWidth: 2,
        borderStyle: 'solid',
        paddingHorizontal: widthScale(13),
        paddingVertical: heightScale(10)
    },
    secondContainer: {
        height: heightScale(240)
    },
    firstContainer: {
        height: heightScale(280)
    },
    thirdContainer: {
        height: heightScale(200)
    },
    rankTopWrap: {
        alignItems: 'center'
    },
    rankBottomWrap: {
        alignItems: 'center'
    },
    iconRank: {
        width: heightScale(24),
        height: heightScale(24)
    },
    rankText: {
        fontSize: heightScale(40),
        letterSpacing: heightScale(-0.4),
        fontWeight: '600',
        color: '#FFFFFF'
    },
    scoreWrap: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 8
    },
    teamNameText: {
        fontSize: heightScale(28),
        letterSpacing: heightScale(-0.3),
        lineHeight: heightScale(40),
        fontWeight: '700',
        color: '#FFFFFF'
    },
    lineViewWrap: {
        paddingHorizontal: heightScale(8)
    },
    lineView: {
        borderStyle: 'solid',
        borderColor: '#fff',
        borderRightWidth: 1,
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    scoreTextWrap: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    scoreTitleText: {
        fontSize: heightScale(14),
        letterSpacing: heightScale(-0.1),
        fontWeight: '500',
        color: '#FFFFFF'
    },
    scoreText: {
        fontSize: heightScale(28),
        letterSpacing: heightScale(-0.3),
        lineHeight: heightScale(40),
        fontWeight: '500',
        color: '#FFFFFF'
    },
    rankTableContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    rankTableHeader: {
        width: widthScale(624),
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: heightScale(35),
        flexDirection: 'row',
        paddingVertical: heightScale(16),
        borderBottomWidth: 0.5,
        borderBottomColor: '#d0d1d0'
    },
    rankTableHeaderText: {
        color: '#d0d1d0',
        letterSpacing: -0.2,
        fontSize: heightScale(20),
        textAlign: 'center'
    },
    rankTableContent: {
        width: widthScale(624),
        alignItems: 'center',
        justifyContent: 'space-around',
        textAlign: 'center',
        flexDirection: 'row',
        paddingVertical: heightScale(16),
        borderBottomWidth: 0.5,
        borderBottomColor: '#d0d1d0'
    },
    rankTableContentText: {
        fontSize: heightScale(24),
        letterSpacing: -0.2,
        fontWeight: '700',
        color: '#FFFFFF',
        textAlign: 'center'
    }
});
