import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { ScreenProps } from '../types';
import { Color, Padding } from '../assets/GlobalStyles';
import GameHeader from '../component/GameHeader';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function InGameScreen({ navigation }: ScreenProps) {
    const [currentSubject, setCurrentSubject] = React.useState(-1);

    const SubjectData = [
        {
            subject: '동물',
            imgPath: require('../assets/icons/subject/animal.png'),
        },
        {
            subject: '식물',
            imgPath: require('../assets/icons/subject/flower.png'),
        },
        {
            subject: '연예인',
            imgPath: require('../assets/icons/subject/start.png'),
        },
        {
            subject: '음식',
            imgPath: require('../assets/icons/subject/pizza.png'),
        },
        {
            subject: '과일',
            imgPath: require('../assets/icons/subject/apple.png'),
        },
        {
            subject: '준비중...',
            // imgPath: require("../assets/icons/subject/apple.png"),
            // gameType: () => navigation.navigate("GameSelect"),
        },
    ];

    const handlerSelectSubject = (index: number) => {
        setCurrentSubject(index);

        setTimeout(() => {
            navigation.navigate('PlayerSettings');
        }, 1000);
    };

    return (
        <View className="flex-1 items-center justify-center" style={styles.container}>
            <GameHeader title={'게임설정'} navigation={navigation} isBack={true} isSetting={true} />

            <View style={styles.subContainer}>
                {SubjectData.map((subject, index) => (
                    <TouchableOpacity key={index}
                                      onPress={() => subject.imgPath > 0 ? handlerSelectSubject(index) : ''}>
                        {
                            subject.imgPath > 0 ?
                                (
                                    <View
                                        style={[styles.subjectWrapper, currentSubject === index && styles.currentSubjectWrapper]}>
                                        <Image style={styles.subjectIcon} resizeMode="cover"
                                               source={subject.imgPath} />
                                        <Text style={styles.subjectText}>{subject.subject}</Text>
                                    </View>
                                ) :
                                (
                                    <View
                                        style={[styles.subjectWrapper, styles.pendingSubjectWrapper]}>
                                        <Image style={styles.subjectIcon} resizeMode="cover"
                                               source={subject.imgPath} />
                                        <Text
                                            style={[styles.subjectText, styles.pendingSubjectText]}>{subject.subject}</Text>
                                    </View>
                                )
                        }
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Color.background,
        paddingHorizontal: 30,
        paddingTop: Padding.ContainerPaddingTop,
    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 65,
    },
    subjectWrapper: {
        height: 120,
        width: 371,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 24,
        borderColor: '#FFFFFF',
        backgroundColor: '#434642',
        paddingHorizontal: 43,
        paddingVertical: 36,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    currentSubjectWrapper: {
        backgroundColor: '#13FF8E',
        shadowColor: '#13ff8e',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 20,
        elevation: 20,
        shadowOpacity: 1,
        borderColor: '#b7ffdd',
        borderWidth: 6,
    },
    pendingSubjectWrapper: {
        borderWidth: 0,
    },
    subjectText: {
        fontWeight: '600',
        color: '#FFFFFF',
        fontSize: 40,
        letterSpacing: -1,
        marginLeft: 25,
    },
    pendingSubjectText: {
        color: '#727471',
    },
    subjectIcon: {
        width: 63,
        height: 52,
    },
});