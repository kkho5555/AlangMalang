import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { ScreenProps } from '../types';
import { Color, Padding } from '../assets/GlobalStyles';
import { widthScale, heightScale, moderateScale } from '../utils/Scaling';
import GameHeader from '../component/GameHeader';

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
            <ScrollView>
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
        paddingTop: Padding.ContainerPaddingTop,
    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: heightScale(65),
    },
    subjectWrapper: {
        height: moderateScale(120),
        width: moderateScale(371),
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: moderateScale(24),
        borderColor: '#FFFFFF',
        backgroundColor: '#434642',
        paddingHorizontal: widthScale(43),
        paddingVertical: heightScale(36),
        marginHorizontal: widthScale(20),
        marginVertical: heightScale(10),
    },
    currentSubjectWrapper: {
        backgroundColor: '#13FF8E',
        shadowColor: '#13ff8e',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: moderateScale(20),
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
        fontSize: widthScale(40),
        letterSpacing: moderateScale(-1),
        marginLeft: moderateScale(25),
    },
    pendingSubjectText: {
        color: '#727471',
    },
    subjectIcon: {
        width: moderateScale(63),
        height: moderateScale(52),
    },
});