import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Pressable
} from 'react-native';
import { GameSubjectType, ScreenProps } from '../types';
import { Color, Padding } from '../assets/GlobalStyles';
import { widthScale, heightScale } from '../utils/Scaling';
import GameHeader from '../component/GameHeader';
import { setGameData, setGameSubject } from '../features/game/gameSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';

export default function InGameScreen({ navigation }: ScreenProps) {
    const [currentSubject, setCurrentSubject] = React.useState(-1);
    const currentGame = useAppSelector((state) => state.game.currentGame);

    const dispatch = useAppDispatch();
    const gameData = useAppSelector((state) => state.game.gameData);

    // FIXME: 백엔드 통신하면 수정될 부분
    const subjects: { [key: string]: any } = {
        animal: require('../assets/icons/subject/animal.png'),
        sports: require('../assets/icons/subject/sports.png'),
        emotion: require('../assets/icons/subject/emotion.png'),
        korean_movie: require('../assets/icons/subject/korean_movie.png'),
        foreign_movie: require('../assets/icons/subject/foreign_movie.png')
    };

    const SubjectData = gameData.map((game) => {
        return {
            name: game.name,
            subject: game.subject,
            imgPath: subjects[game.subject]
        };
    });

    const handlerSelectSubject = (index: number) => {
        setCurrentSubject(index);
        dispatch(
            setGameSubject({
                game: currentGame,
                subject: SubjectData[index].subject
            })
        );
        dispatch(setGameData(gameData[index]));
        setTimeout(() => {
            navigation.navigate('PlayerSettings');
        }, 100);
    };

    return (
        <View
            className="flex-1 items-center justify-center"
            style={styles.container}
        >
            <GameHeader
                title="주제선택"
                navigation={navigation}
                isBack
                isTeamSetting={false}
                isPlaySetting
                isRefreshSetting={false}
            />
            <ScrollView>
                <View style={styles.subContainer}>
                    {SubjectData.map((subject, index) => (
                        <Pressable
                            key={index}
                            onPress={() =>
                                subject.imgPath
                                    ? handlerSelectSubject(index)
                                    : ''
                            }
                        >
                            {subject.imgPath ? (
                                <View
                                    key={index}
                                    style={[
                                        styles.subjectWrapper,
                                        currentSubject === index &&
                                            styles.currentSubjectWrapper
                                    ]}
                                >
                                    <Image
                                        style={styles.subjectIcon}
                                        resizeMode="cover"
                                        source={subject.imgPath}
                                    />
                                    <Text style={styles.subjectText}>
                                        {subject.name}
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
                                    <Image
                                        style={styles.subjectIcon}
                                        resizeMode="cover"
                                        source={subject.imgPath}
                                    />
                                    <Text
                                        style={[
                                            styles.subjectText,
                                            styles.pendingSubjectText
                                        ]}
                                    >
                                        {subject.name}
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
