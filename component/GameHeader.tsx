import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ScreenProps } from '../types';
import { Color, Padding } from '../assets/GlobalStyles';


interface IGameHeader {
    title: string,
    isBack: boolean,
    isSetting: boolean,
    navigation: ScreenProps['navigation'];
}

export default function GameHeader({ navigation, title, isBack, isSetting }: IGameHeader) {
    const handlerBack = () => {
        navigation.goBack();
    };

    const handlerTeamSetting = () => {
        console.log('handlerTeamSetting');
    };

    return (
        <View style={styles.headerContainer}>
            {isBack && (
                <TouchableOpacity onPress={handlerBack}>
                    <View style={styles.settingWrap}>
                        <View style={styles.iconWrap}>
                            <Image style={styles.iconArrow} resizeMode="cover"
                                   source={require('../assets/icons/icon-left-arrow.png')} />
                        </View>
                    </View>
                </TouchableOpacity>
            )}

            <Text style={styles.mainText}>{title}</Text>

            {isSetting && (
                <TouchableOpacity onPress={handlerTeamSetting}>
                    <View style={styles.settingWrap}>
                        <View style={styles.iconWrap}>
                            <Image style={styles.iconSetting} resizeMode="cover"
                                   source={require('../assets/icons/icon-setting.png')} />
                        </View>
                        <Text style={styles.settingText}>팀 설정</Text>
                    </View>
                </TouchableOpacity>
            )}
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
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainText: {
        flex: 1,
        color: Color.mainText,
        textAlign: 'center',
        fontSize: 50,
        fontWeight: 'bold',
    },
    settingWrap: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconWrap: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconArrow: {
        width: 48,
        height: 36,
    },
    iconSetting: {
        width: 40,
        height: 40,
    },
    settingText: {
        color: '#B9BAB9',
        fontWeight: '500',
        fontSize: 20,
        marginTop: 12,
    },
});