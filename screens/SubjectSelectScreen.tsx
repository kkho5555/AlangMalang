// SubjectSelect.tsx
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Color, Padding } from '../assets/GlobalStyles';
import Text from '../component/DefaultText';
import GameHeader from '../component/GameHeader';
import {
    fetchTopicList,
    setGameData,
    setGameSubject
} from '../features/game/gameSlice';
import { ScreenProps } from '../types';
import { heightScale, widthScale } from '../utils/Scaling';

export default function SubjectSelect({ navigation }: ScreenProps) {
    const [currentSubject, setCurrentSubject] = useState(-1);
    const [loading, setLoading] = useState(true);
    const currentGame = useAppSelector((state) => state.game.currentGame);
    const subjectData = useAppSelector((state) => state.game.topicList);
    const gameData = useAppSelector((state) => state.game.gameData);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const loadTopics = async () => {
            await dispatch(fetchTopicList(currentGame.id));
            setLoading(false);
        };
        loadTopics();
    }, [dispatch, currentGame.id]);

    const handlerSelectSubject = (index: number) => {
        setCurrentSubject(index);
        dispatch(
            setGameSubject({
                game: currentGame,
                subject: subjectData[index].topicName
            })
        );
        dispatch(setGameData(gameData[index]));
        setTimeout(() => {
            navigation.navigate('PlayerSettings');
        }, 100);
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={Color.primary} />
            </View>
        );
    }

    return (
        <View
            className="flex-1 items-center justify-center"
            style={styles.container}
        >
            <GameHeader
                title="주제 선택"
                navigation={navigation}
                isBack
                isTeamSetting={false}
                isPlaySetting
                isRefreshSetting={false}
            />
            <ScrollView>
                <View style={styles.subContainer}>
                    {subjectData.map((subject, index) => (
                        <Pressable
                            key={index}
                            onPress={() =>
                                subject.topicImg
                                    ? handlerSelectSubject(index)
                                    : ''
                            }
                        >
                            {subject.topicImg ? (
                                <View
                                    key={index}
                                    style={[
                                        styles.subjectWrapper,
                                        currentSubject === index &&
                                            styles.currentSubjectWrapper
                                    ]}
                                >
                                    {/* <Image
                                        style={styles.subjectIcon}
                                        resizeMode="cover"
                                        source={subject.imgPath}
                                    /> */}
                                    <Text style={styles.subjectText}>
                                        {subject.topicName}
                                    </Text>
                                </View>
                            ) : (
                                <View
                                    key={index}
                                    style={[
                                        styles.subjectWrapper,
                                        styles.pendingSubjectWrapper
                                    ]}
                                >
                                    {/* <Image
                                        style={styles.subjectIcon}
                                        resizeMode="cover"
                                        source={subject.topicImg}
                                    /> */}
                                    <Text
                                        style={[
                                            styles.subjectText,
                                            styles.pendingSubjectText
                                        ]}
                                    >
                                        {subject.topicName}
                                    </Text>
                                </View>
                            )}
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Color.background,
        paddingHorizontal: widthScale(30),
        paddingTop: Padding.ContainerPaddingTop
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.background
    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: heightScale(65)
    },
    subjectWrapper: {
        height: heightScale(120),
        width: widthScale(371),
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: heightScale(24),
        borderColor: '#FFFFFF',
        backgroundColor: '#434642',
        paddingHorizontal: heightScale(43),
        marginHorizontal: heightScale(20),
        marginVertical: heightScale(10)
    },
    currentSubjectWrapper: {
        backgroundColor: '#13FF8E',
        shadowColor: '#13ff8e',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: heightScale(20),
        elevation: heightScale(20),
        shadowOpacity: 1,
        borderColor: '#b7ffdd',
        borderWidth: heightScale(6)
    },
    pendingSubjectWrapper: {
        borderWidth: 0
    },
    subjectText: {
        fontWeight: '600',
        color: '#FFFFFF',
        fontSize: heightScale(40),
        letterSpacing: heightScale(-1),
        marginLeft: heightScale(25)
    },
    pendingSubjectText: {
        color: '#727471'
    },
    subjectIcon: {
        width: heightScale(63),
        height: heightScale(52)
    }
});
