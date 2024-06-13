import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { getRank, RankResponse } from '../app/api';
import { useAppSelector } from '../app/hooks';
import Text from '../component/DefaultText';
import { ScreenProps } from '../types';
import { heightScale, widthScale } from '../utils/Scaling';

export default function EndGameScreen({ navigation }: ScreenProps) {
    const currentTeam = useAppSelector((state) => state.game.currentTeam);
    const currentGame = useAppSelector((state) => state.game.currentGame);
    const currentGameOption = useAppSelector(
        (state) => state.game.currentGameOption
    );
    const currentGameSubject = useAppSelector(
        (state) => state.game.currentGameSubject
    );
    const currentGameResult = useAppSelector(
        (state) => state.game.currentGameResult
    );
    const [rankData, setRankData] = useState<RankResponse[]>();

    useEffect(() => {
        const setRank = async () => {
            const userId = await AsyncStorage.getItem('userId');
            if (userId) {
                const rankDatas = await getRank(userId);
                if (rankDatas?.length) {
                    setRankData(rankDatas);
                }
            }
        };
        setRank();
    }, []);

    console.log('Current Game:', currentGame);
    console.log('Current Game Option:', currentGameOption);
    console.log('Current Game Subject:', currentGameSubject);
    console.log('Current Game Result:', currentGameResult);

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>게임 결과</Text>
            <View style={styles.resultTableContainer}>
                <View style={styles.resultTableHeader}>
                    <View style={{ flex: 10 }}>
                        <Text style={styles.resultTableHeaderText}>순위</Text>
                    </View>
                    <View style={{ flex: 40 }}>
                        <Text style={styles.resultTableHeaderText}>이름</Text>
                    </View>
                    <View style={{ flex: 10 }}>
                        <Text
                            style={[
                                styles.resultTableHeaderText,
                                styles.resultTableHeaderSubText
                            ]}
                        >
                            주제
                        </Text>
                    </View>
                    <View style={{ flex: 10 }}>
                        <Text
                            style={[
                                styles.resultTableHeaderText,
                                styles.resultTableHeaderSubText
                            ]}
                        >
                            시간
                        </Text>
                    </View>
                    <View style={{ flex: 10 }}>
                        <Text
                            style={[
                                styles.resultTableHeaderText,
                                styles.resultTableHeaderSubText
                            ]}
                        >
                            난이도
                        </Text>
                    </View>
                    <View style={{ flex: 20 }}>
                        <Text style={styles.resultTableHeaderText}>점수</Text>
                    </View>
                </View>

                <ScrollView
                    style={{
                        width: widthScale(900),
                        maxHeight: heightScale(370)
                    }}
                >
                    {rankData &&
                        rankData.map((item, index) => {
                            return (
                                <View
                                    style={{ alignItems: 'center' }}
                                    key={index}
                                >
                                    <View
                                        style={[
                                            styles.resultTableContent,

                                            styles.resultTableCurrentTeam
                                        ]}
                                    >
                                        <View style={{ flex: 10 }}>
                                            <Text
                                                style={[
                                                    styles.resultTableContentText,

                                                    styles.resultTableCurrentContentText
                                                ]}
                                            >
                                                {index + 1}
                                            </Text>
                                        </View>
                                        <View style={{ flex: 40 }}>
                                            <Text
                                                style={[
                                                    styles.resultTableContentText,

                                                    styles.resultTableCurrentContentText
                                                ]}
                                            >
                                                {item.teamName}
                                            </Text>
                                        </View>
                                        <View style={{ flex: 10 }}>
                                            <Text
                                                style={[
                                                    styles.resultTableContentText,
                                                    styles.resultTableContentSubText,

                                                    styles.resultTableCurrentContentText
                                                ]}
                                            >
                                                {item.detail}
                                            </Text>
                                        </View>
                                        <View style={{ flex: 10 }}>
                                            <Text
                                                style={[
                                                    styles.resultTableContentText,
                                                    styles.resultTableContentSubText,

                                                    styles.resultTableCurrentContentText
                                                ]}
                                            >
                                                {item.detail[0].playTime}
                                            </Text>
                                        </View>
                                        <View style={{ flex: 10 }}>
                                            <Text
                                                style={[
                                                    styles.resultTableContentText,
                                                    styles.resultTableContentSubText,

                                                    styles.resultTableCurrentContentText
                                                ]}
                                            >
                                                {item.detail[0].level}
                                            </Text>
                                        </View>
                                        <View style={{ flex: 20 }}>
                                            <Text
                                                style={[
                                                    styles.resultTableContentText,

                                                    styles.resultTableCurrentContentText
                                                ]}
                                            >
                                                {item.detail[0].score}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        })}
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.buttonWrapper}
                        onPress={() => navigation.navigate('GameSelect')}
                    >
                        <Text style={styles.buttonText}>다른 게임하기</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonWrapper}
                        onPress={() => navigation.navigate('OverallRanking')}
                    >
                        <Text style={styles.buttonText}>전체 랭킹 보기</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonWrapper}
                        onPress={() => navigation.navigate('SubjectSelect')}
                    >
                        <Text style={styles.buttonText}>다시하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2c2f2b',
        paddingTop: heightScale(83),
        paddingBottom: heightScale(70),
        paddingHorizontal: widthScale(84)
    },
    titleText: {
        fontSize: heightScale(48),
        letterSpacing: heightScale(-0.5),
        fontFamily: 'ONE Mobile POP',
        color: '#f3f3f3'
    },
    resultTableContainer: {
        marginTop: heightScale(30),
        justifyContent: 'center',
        alignItems: 'center'
    },
    resultTableHeader: {
        width: widthScale(705),
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: heightScale(35),
        flexDirection: 'row',
        paddingVertical: heightScale(16),
        borderBottomWidth: 0.5,
        borderBottomColor: '#5B5D5A'
    },
    resultTableHeaderText: {
        fontSize: heightScale(24),
        letterSpacing: heightScale(-0.2),
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center'
    },
    resultTableHeaderSubText: {
        fontSize: heightScale(20),
        letterSpacing: heightScale(-0.2),
        fontWeight: '500',
        color: '#d0d1d0',
        textAlign: 'center'
    },
    resultTableContent: {
        width: widthScale(705),
        alignItems: 'center',
        justifyContent: 'space-around',
        textAlign: 'center',
        flexDirection: 'row',
        paddingVertical: heightScale(16),
        borderBottomWidth: 0.5,
        borderBottomColor: '#5B5D5A'
    },
    resultTableCurrentTeam: {
        shadowColor: '#13ff8e',
        shadowOffset: {
            width: 0,
            height: 4
        },
        width: widthScale(712),
        paddingTop: heightScale(13),
        paddingBottom: heightScale(20),
        shadowRadius: heightScale(40),
        elevation: heightScale(40),
        shadowOpacity: 1,
        borderRadius: heightScale(24),
        backgroundColor: '#b8ffdd',
        borderStyle: 'solid',
        borderColor: '#b7ffdd',
        borderWidth: heightScale(6)
    },
    resultTableContentText: {
        fontSize: heightScale(24),
        letterSpacing: heightScale(-0.2),
        fontWeight: '700',
        color: '#FFFFFF',
        textAlign: 'center'
    },
    resultTableCurrentContentText: {
        color: '#2c2f2b'
    },
    resultTableContentSubText: {
        fontSize: heightScale(20),
        letterSpacing: heightScale(-0.2),
        fontWeight: '500',
        color: '#d0d1d0',
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: heightScale(60),
        flexDirection: 'row',
        gap: widthScale(25)
    },
    buttonWrapper: {
        flex: 1,
        borderRadius: heightScale(16),
        backgroundColor: '#434642',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: widthScale(40),
        paddingVertical: heightScale(20)
    },
    buttonText: {
        fontSize: heightScale(28),
        letterSpacing: heightScale(-0.3),
        lineHeight: heightScale(40),
        fontWeight: '500',
        color: '#ffffff'
    }
});
