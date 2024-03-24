import React from "react";
import {Text, StyleSheet, View, Image, Dimensions, TouchableOpacity} from "react-native";
import {ScreenProps} from "../types";
import Carousel from "../component/Carousel";
import {LinearGradient} from "expo-linear-gradient";

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


export default function GameSelectScreen({navigation}: ScreenProps) {
    const GameData = [
        {
            num: 1,
            bgColor1: '#ffa235',
            bgColor2: '#fff3b2',
            title: '이어말하기',
            type: '개인전',
            headCount: '2인 ~ 6인',
            gameManual: {
                tester: '이어 제시되는 단어를 행동으로 설명해요',
                participant: '이어 행동을 보고 어떤 단어인지 맞춰요',
            },
            imgPath: require("../assets/icons/banana.png"),
            gameType: () => navigation.navigate("InGame"),
        },
        {
            num: 2,
            bgColor1: '#35aaff',
            bgColor2: '#fff3b2',
            title: '고요속의 외침',
            type: '개인전',
            headCount: '2인 ~ 6인',
            gameManual: {
                tester: '고요 제시되는 단어를 행동으로 설명해요',
                participant: '고요 행동을 보고 어떤 단어인지 맞춰요',
            },
            imgPath: require("../assets/icons/star.png"),
            gameType: () => navigation.navigate("InGame"),
        },
        {
            num: 3,
            bgColor1: '#ff3565',
            bgColor2: '#ffcbc4',
            title: '몸으로 말해요',
            type: '개인전',
            headCount: '2인 ~ 6인',
            gameManual: {
                tester: '몸말 제시되는 단어를 행동으로 설명해요',
                participant: '몸말 행동을 보고 어떤 단어인지 맞춰요',
            },
            imgPath: require("../assets/icons/cherry.png"),
            gameType: () => navigation.navigate("InGame"),
        },
        {
            num: 4,
            bgColor1: '#ff3565',
            bgColor2: '#ffcbc4',
            title: '키으로 말해요',
            type: '개인전',
            headCount: '2인 ~ 6인',
            gameManual: {
                tester: '키말 제시되는 단어를 행동으로 설명해요',
                participant: '키말 행동을 보고 어떤 단어인지 맞춰요',
            },
            imgPath: require("../assets/icons/banana.png"),
            gameType: () => navigation.navigate("InGame"),
        },
        {
            num: 5,
            bgColor1: '#ff3565',
            bgColor2: '#ffcbc4',
            title: '빨리 말해요',
            type: '개인전',
            headCount: '2인 ~ 6인',
            gameManual: {
                tester: '빨말 제시되는 단어를 행동으로 설명해요',
                participant: '빨말 행동을 보고 어떤 단어인지 맞춰요',
            },
            imgPath: require("../assets/icons/star.png"),
            gameType: () => navigation.navigate("InGame"),
        },
    ];

    const handlerTeamSetting = () => {
        console.log('handlerTeamSetting')
    };

    const handlerGameSetting = () => {
        console.log('handlerGameSetting')
    }

    return (
        <View className="flex-1 items-center justify-center" style={styles.container}>
            <Text style={styles.mainText}>게임선택하기</Text>

            <View style={styles.carouselWarp}>
                <View style={styles.carouselOuter}>
                    <Carousel GameData={GameData}/>
                </View>
            </View>

            <View style={styles.bottomContainer}>
                <View style={styles.rankContainer}>
                    <Text style={styles.rankTitleText}>전체 랭킹</Text>
                    <Text style={[styles.rankTitleText, styles.divider]}>|</Text>
                    <View style={styles.rankWrap}>
                        <LinearGradient
                            style={styles.rankOuter}
                            colors={["#ffa235", "#fff3b2"]}>
                            <Image
                                style={styles.iconCrown}
                                resizeMode="cover"
                                source={require("../assets/icons/icon-crown.png")}
                            />
                            <Text style={styles.crownRankTitle}>1st</Text>
                        </LinearGradient>
                        <Text style={styles.rankText}>심연의 그린</Text>
                    </View>
                    <View style={styles.rankWrap}>
                        <LinearGradient
                            style={styles.rankOuter}
                            colors={["#D0D1D0", "#D0D1D0"]}>
                            <Image
                                style={styles.iconCrown}
                                resizeMode="cover"
                                source={require("../assets/icons/icon-crown.png")}
                            />
                            <Text style={styles.crownRankTitle}>2nd</Text>
                        </LinearGradient>
                        <Text style={styles.rankText}>우아한 코랄</Text>
                    </View>
                    <View style={styles.rankWrap}>
                        <LinearGradient
                            style={styles.rankOuter}
                            colors={["#D0D1D0", "#D0D1D0"]}>
                            <Image
                                style={styles.iconCrown}
                                resizeMode="cover"
                                source={require("../assets/icons/icon-crown.png")}
                            />
                            <Text style={styles.crownRankTitle}>3rd</Text>
                        </LinearGradient>
                        <Text style={styles.rankText}>진중한 블루</Text>
                    </View>
                </View>
                <View style={styles.settingContainer}>
                    <TouchableOpacity onPress={handlerTeamSetting}>
                        <View style={styles.settingWrap}>
                            <View style={styles.iconWrap}>
                                <Image style={styles.iconPeople} resizeMode="cover"
                                       source={require('../assets/icons/icon-people.png')}/>
                            </View>
                            <Text style={styles.settingText}>팀 설정</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handlerGameSetting}>
                        <View style={[styles.settingWrap, styles.gameSettingWrap]}>
                            <View style={styles.iconWrap}>
                                <Image style={styles.iconSetting} resizeMode="cover"
                                       source={require('../assets/icons/icon-setting.png')}/>
                            </View>
                            <Text style={styles.settingText}>게임 설정</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#2C2F2B",
    },
    mainText: {
        fontSize: 48,
        color: "#F3F3F3",
        fontWeight: "bold",
        marginBottom: screenHeight * 0.04
    },
    carouselOuter: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
    },
    carouselWarp: {
        marginTop: 36,
        alignItems: "center",
    },
    bottomContainer: {
        marginTop: 40,
        paddingHorizontal: 40,
        width: '100%',
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center"
    },
    rankContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#434642',
        borderRadius: 8,
    },
    rankTitleText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#898B89'
    },
    divider: {
        marginHorizontal: 16,
    },
    rankWrap: {
        flexDirection: "row",
    },
    rankOuter: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 999,
    },
    iconCrown: {
        width: 20,
        height: 16,
    },
    crownRankTitle: {
        marginLeft: 8,
    },
    rankText: {
        marginLeft: 8,
        marginRight: 16,
        fontWeight: '600',
        fontSize: 20,
        color: '#FFFFFF',
        letterSpacing: -1
    },
    settingContainer: {
        flexDirection: "row",
    },
    settingWrap: {
        justifyContent: "center",
        alignItems: "center",
    },
    gameSettingWrap: {
        marginLeft: 27,
    },
    iconWrap: {
        height: 36,
        width: 38,
        justifyContent: "center",
        alignItems: "center",
    },
    iconPeople: {
        width: 38,
        height: 26
    },
    iconSetting: {
        width: 34,
        height: 36,
    },
    settingText: {
        color: '#B9BAB9',
        fontWeight: '500',
        fontSize: 20,
        marginTop: 8,
    }
})