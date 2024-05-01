import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ScreenProps } from '../types';
import { useAppSelector } from '../app/hooks';
import { heightScale, widthScale } from '../utils/Scaling';
import Text from '../component/DefaultText';

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

    const ResultDataList = [
        {
            teamId: 1,
            teamName: '심연의 그린',
            subject: '동물',
            playTime: 30,
            difficulty: '쉬움',
            score: 8
        },
        {
            teamId: 2,
            teamName: '우아한 코랄',
            subject: '동물',
            playTime: 30,
            difficulty: '쉬움',
            score: 6
        },
        {
            teamId: 3,
            teamName: '진중한 블루',
            subject: '동물',
            playTime: 30,
            difficulty: '쉬움',
            score: 5
        },
        {
            teamId: 4,
            teamName: '까만 블랙',
            subject: '동물',
            playTime: 30,
            difficulty: '쉬움',
            score: 4
        },
        {
            teamId: 5,
            teamName: '빨간 레드',
            subject: '동물',
            playTime: 30,
            difficulty: '쉬움',
            score: 2
        },
        {
            teamId: 6,
            teamName: '노란 옐로우',
            subject: '동물',
            playTime: 30,
            difficulty: '쉬움',
            score: 0
        },
        {
            teamId: 7,
            teamName: '초록 그린',
            subject: '동물',
            playTime: 30,
            difficulty: '쉬움',
            score: 0
        },
        {
            teamId: 8,
            teamName: '보라 핑크',
            subject: '동물',
            playTime: 30,
            difficulty: '쉬움',
            score: 0
        },
        {
            teamId: 9,
            teamName: '하늘 블루',
            subject: '동물',
            playTime: 30,
            difficulty: '쉬움',
            score: 0
        },
        {
            teamId: 10,
            teamName: '갈색 브라운',
            subject: '동물',
            playTime: 30,
            difficulty: '쉬움',
            score: 0
        }
    ];

    const currentTeamID = 4;

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
                        <Text style={styles.resultTableHeaderText}>
                            순위
                        </Text>
                    </View>
                    <View style={{ flex: 40 }}>
                        <Text style={styles.resultTableHeaderText}>
                            이름
                        </Text>
                    </View>
                    <View style={{ flex: 10 }}>
                        <Text style={[styles.resultTableHeaderText, styles.resultTableHeaderSubText]}>
                            주제
                        </Text>
                    </View>
                    <View style={{ flex: 10 }}>
                        <Text style={[styles.resultTableHeaderText, styles.resultTableHeaderSubText]}>
                            시간
                        </Text>
                    </View>
                    <View style={{ flex: 10 }}>
                        <Text style={[styles.resultTableHeaderText, styles.resultTableHeaderSubText]}>
                            난이도
                        </Text>
                    </View>
                    <View style={{ flex: 20 }}>
                        <Text style={styles.resultTableHeaderText}>
                            점수
                        </Text>
                    </View>
                </View>

                <ScrollView style={{ width: widthScale(900), maxHeight: heightScale(370) }}>
                    {ResultDataList.map((item, index) => {
                        return (
                            <View style={{ alignItems: 'center' }} key={index}>
                                <View
                                    style={[styles.resultTableContent, item.teamId === currentTeamID && styles.resultTableCurrentTeam]}>
                                    <View style={{ flex: 10 }}>
                                        <Text
                                            style={[styles.resultTableContentText, item.teamId === currentTeamID && styles.resultTableCurrentContentText]}>
                                            {index + 1}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 40 }}>
                                        <Text
                                            style={[styles.resultTableContentText, item.teamId === currentTeamID && styles.resultTableCurrentContentText]}>
                                            {item.teamName}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 10 }}>
                                        <Text
                                            style={[styles.resultTableContentText, styles.resultTableContentSubText, item.teamId === currentTeamID && styles.resultTableCurrentContentText]}>
                                            {item.subject}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 10 }}>
                                        <Text
                                            style={[styles.resultTableContentText, styles.resultTableContentSubText, item.teamId === currentTeamID && styles.resultTableCurrentContentText]}>
                                            {item.playTime}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 10 }}>
                                        <Text
                                            style={[styles.resultTableContentText, styles.resultTableContentSubText, item.teamId === currentTeamID && styles.resultTableCurrentContentText]}>
                                            {item.difficulty}
                                        </Text>
                                    </View>
                                    <View style={{ flex: 20 }}>
                                        <Text
                                            style={[styles.resultTableContentText, item.teamId === currentTeamID && styles.resultTableCurrentContentText]}>
                                            {item.score}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonWrapper}
                                      onPress={() => navigation.navigate('GameSelect')}>
                        <Text style={styles.buttonText}>다른 게임하기</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonWrapper}
                                      onPress={() => navigation.navigate('OverallRanking')}>
                        <Text style={styles.buttonText}>전체 랭킹 보기</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonWrapper}
                                      onPress={() => navigation.navigate('SubjectSelect')}>
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

