import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    Pressable,
    Dimensions,
    GestureResponderEvent,
} from 'react-native';
import { heightScale, moderateScale, widthScale } from '../../utils/Scaling';

interface IScoreResetProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default function ScoreDetail({
    modalVisible,
    setModalVisible,
}: IScoreResetProps) {
    const teamName = '심연의 그린';
    const DetailScoreList = [
        {
            gameTitle: '몸으로 말해요',
            subject: '동물',
            time: '60초',
            level: '쉬움',
            score: '8',
        },
        {
            gameTitle: '몸으로 말해요',
            subject: '동물',
            time: '60초',
            level: '쉬움',
            score: '6',
        },
        {
            gameTitle: '음악퀴즈',
            subject: '동물',
            time: '60초',
            level: '쉬움',
            score: '5',
        },
        {
            gameTitle: '스피드퀴즈',
            subject: '동물',
            time: '60초',
            level: '쉬움',
            score: '4',
        },
        {
            gameTitle: '몸으로 말해요',
            subject: '동물',
            time: '60초',
            level: '쉬움',
            score: '2',
        },
        {
            gameTitle: '스피드퀴즈',
            subject: '동물',
            time: '60초',
            level: '쉬움',
            score: '0',
        },
    ];

    const handlerBackground = (e: GestureResponderEvent) => {
        if (e.target !== e.currentTarget) {
            return;
        }
        setModalVisible(!modalVisible);
    };

    return (
        <Modal
            statusBarTranslucent
            animationType="fade"
            transparent
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <Pressable
                style={styles.centeredView}
                onPress={(e) => handlerBackground(e)}
            >
                <View>
                    <View style={styles.modalView}>
                        <Pressable
                            style={styles.closeButtonWrapper}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Image
                                resizeMode="cover"
                                source={require('../../assets/icons/icon-close.png')}
                            />
                        </Pressable>

                        <View style={styles.modalContent}>
                            <View>
                                <Text style={styles.modalTitle}>
                                    {teamName}
                                </Text>

                                <View style={styles.rankTableContainer}>
                                    <View style={styles.rankTableHeader}>
                                        <View style={{ flex: 40 }}>
                                            <Text
                                                style={[
                                                    styles.rankTableHeaderText,
                                                    styles.rankTableGame,
                                                ]}
                                            >
                                                게임
                                            </Text>
                                        </View>
                                        <View style={{ flex: 20 }}>
                                            <Text
                                                style={
                                                    styles.rankTableHeaderText
                                                }
                                            >
                                                주제
                                            </Text>
                                        </View>
                                        <View style={{ flex: 15 }}>
                                            <Text
                                                style={
                                                    styles.rankTableHeaderText
                                                }
                                            >
                                                시간
                                            </Text>
                                        </View>
                                        <View style={{ flex: 20 }}>
                                            <Text
                                                style={
                                                    styles.rankTableHeaderText
                                                }
                                            >
                                                난이도
                                            </Text>
                                        </View>
                                        <View style={{ flex: 15 }}>
                                            <Text
                                                style={[
                                                    styles.rankTableHeaderText,
                                                    styles.rankTableScore,
                                                ]}
                                            >
                                                점수
                                            </Text>
                                        </View>
                                    </View>

                                    <View>
                                        {DetailScoreList.map((item, index) => {
                                            return (
                                                <View
                                                    key={index}
                                                    style={
                                                        styles.rankTableContent
                                                    }
                                                >
                                                    <View style={{ flex: 40 }}>
                                                        <Text
                                                            style={[
                                                                styles.rankTableContentText,
                                                                styles.rankTableGame,
                                                            ]}
                                                        >
                                                            {item.gameTitle}
                                                        </Text>
                                                    </View>
                                                    <View style={{ flex: 20 }}>
                                                        <Text
                                                            style={
                                                                styles.rankTableContentText
                                                            }
                                                        >
                                                            {item.subject}
                                                        </Text>
                                                    </View>
                                                    <View style={{ flex: 15 }}>
                                                        <Text
                                                            style={
                                                                styles.rankTableContentText
                                                            }
                                                        >
                                                            {item.time}
                                                        </Text>
                                                    </View>
                                                    <View style={{ flex: 20 }}>
                                                        <Text
                                                            style={
                                                                styles.rankTableContentText
                                                            }
                                                        >
                                                            {item.level}
                                                        </Text>
                                                    </View>
                                                    <View style={{ flex: 15 }}>
                                                        <Text
                                                            style={[
                                                                styles.rankTableContentText,
                                                                styles.rankTableScore,
                                                            ]}
                                                        >
                                                            {item.score}
                                                        </Text>
                                                    </View>
                                                </View>
                                            );
                                        })}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(67, 70, 66, 0.8)',
    },
    modalView: {
        backgroundColor: 'rgba(20, 23, 19, 0.9)',
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: heightScale(20),
        elevation: heightScale(20),
        shadowOpacity: 1,
        borderColor: '#727471',
        flex: 1,
        width: windowWidth * 0.9,
        maxHeight: windowHeight * 0.9,
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: heightScale(16),
        paddingHorizontal: heightScale(40),
        paddingTop: heightScale(110),
        paddingBottom: heightScale(50),
    },
    closeButtonWrapper: {
        top: heightScale(35),
        right: heightScale(45),
        width: moderateScale(48),
        height: moderateScale(48),
        overflow: 'hidden',
        position: 'absolute',
    },
    modalContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    modalTitle: {
        fontSize: heightScale(48),
        letterSpacing: heightScale(-0.5),
        color: '#f3f3f3',
        textAlign: 'center',
    },
    rankTableContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    rankTableHeader: {
        width: widthScale(575),
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: heightScale(35),
        flexDirection: 'row',
        paddingVertical: heightScale(16),
        paddingHorizontal: widthScale(18),
        borderBottomWidth: 0.5,
        borderBottomColor: '#d0d1d0',
    },
    rankTableHeaderText: {
        fontSize: heightScale(20),
        letterSpacing: heightScale(-0.2),
        color: '#d0d1d0',
        textAlign: 'center',
    },
    rankTableGame: {
        fontSize: heightScale(24),
        letterSpacing: heightScale(-0.2),
        fontWeight: '700',
        textAlign: 'left',
    },
    rankTableContent: {
        width: widthScale(575),
        alignItems: 'center',
        justifyContent: 'space-around',
        textAlign: 'center',
        flexDirection: 'row',
        paddingVertical: heightScale(16),
        paddingHorizontal: widthScale(18),
        borderBottomWidth: 0.5,
        borderBottomColor: '#d0d1d0',
    },
    rankTableContentText: {
        fontSize: heightScale(20),
        letterSpacing: heightScale(-0.2),
        color: '#d0d1d0',
        textAlign: 'center',
    },
    rankTableScore: {
        fontSize: heightScale(24),
        letterSpacing: heightScale(-0.2),
        fontWeight: '700',
    },
});
