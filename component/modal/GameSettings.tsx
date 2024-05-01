import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    Switch,
    Pressable,
    Dimensions,
    GestureResponderEvent
} from 'react-native';
import { heightScale, moderateScale, widthScale } from '../../utils/Scaling';

interface IScoreResetProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default function ScoreReset({
                                       modalVisible,
                                       setModalVisible
                                   }: IScoreResetProps) {

    const [isEnabledBgm, setIsEnabledBgm] = useState(false);
    const [isEnabledEffect, setIsEnabledEffect] = useState(false);
    const toggleSwitchBgm = () => setIsEnabledBgm(previousState => !previousState);
    const toggleSwitchEffect = () => setIsEnabledEffect(previousState => !previousState);
    const handlerBackground = (e: GestureResponderEvent) => {
        if (e.target !== e.currentTarget) {
            return;
        }
        setModalVisible(!modalVisible);
    };

    const handlerShare = () => {
        console.log('handlerShare');
    };

    const handlerGiveStar = () => {
        console.log('handlerGiveStar');
    };

    const handlerTeamExit = () => {
        console.log('handlerTeamExit');
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
                                style={styles.closeIcon}
                                resizeMode="cover"
                                source={require('../../assets/icons/icon-close.png')}
                            />
                        </Pressable>

                        <View style={styles.modalContent}>
                            <View>
                                <Text style={styles.modalTitle}>
                                    게임 설정
                                </Text>
                            </View>

                            <View style={styles.settingView}>
                                <View style={styles.settingTextWrapper}>
                                    <Image style={styles.iconImage}
                                           resizeMode="cover"
                                           source={require('../../assets/icons/icon-loudspeaker.png')}
                                    />
                                    <Text style={styles.settingText}>배경음악</Text>
                                </View>
                                <View style={styles.controlTextWrapper}>
                                    <Text style={styles.controlText}>{isEnabledBgm ? 'ON' : 'OFF'}</Text>
                                    <Switch
                                        style={{ transform: [{ scaleX: heightScale(1) }, { scaleY: heightScale(1) }] }}
                                        trackColor={{ false: '#938f99', true: '#13ff8e' }}
                                        thumbColor={isEnabledBgm ? '#ffffff' : '#49454f'}
                                        ios_backgroundColor="#938f99"
                                        onValueChange={toggleSwitchBgm}
                                        value={isEnabledBgm}
                                    />
                                </View>
                            </View>

                            <View style={styles.settingView}>
                                <View style={styles.settingTextWrapper}>
                                    <Image style={styles.iconImage}
                                           resizeMode="cover"
                                           source={require('../../assets/icons/icon-loudspeaker.png')}
                                    />
                                    <Text style={styles.settingText}>효과음</Text>
                                </View>
                                <View style={styles.controlTextWrapper}>
                                    <Text style={styles.controlText}>{isEnabledEffect ? 'ON' : 'OFF'}</Text>
                                    <Switch
                                        style={{ transform: [{ scaleX: heightScale(1) }, { scaleY: heightScale(1) }] }}
                                        trackColor={{ false: '#938f99', true: '#13ff8e' }}
                                        thumbColor={isEnabledEffect ? '#ffffff' : '#49454f'}
                                        ios_backgroundColor="#938f99"
                                        onValueChange={toggleSwitchEffect}
                                        value={isEnabledEffect}
                                    />
                                </View>
                            </View>

                            <View style={styles.buttonWrap}>
                                <TouchableOpacity
                                    style={[
                                        styles.modalButton,
                                        styles.primaryButton,
                                        { flex: 2 }
                                    ]}
                                    onPress={handlerShare}
                                >
                                    <Image style={styles.iconImage}
                                           resizeMode="cover"
                                           source={require('../../assets/icons/icon-share.png')} />
                                    <Text style={styles.buttonText}>
                                        공유하기
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.modalButton,
                                        styles.primaryButton,
                                        { flex: 3 }
                                    ]}
                                    onPress={handlerGiveStar}
                                >
                                    <Image style={styles.iconImage}
                                           resizeMode="cover"
                                           source={require('../../assets/icons/icon-star.png')} />
                                    <Text style={styles.buttonText}>
                                        별점 5개 주러 가기
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.buttonWrap, { marginTop: heightScale(25) }]}>
                                <TouchableOpacity
                                    style={[
                                        styles.modalButton
                                    ]}
                                    onPress={handlerTeamExit}
                                >
                                    <Image style={styles.iconImage}
                                           resizeMode="cover"
                                           source={require('../../assets/icons/icon-user-square.png')} />
                                    <Text style={styles.buttonText}>
                                        팀 엑시트 알아보기
                                    </Text>
                                </TouchableOpacity>
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
        backgroundColor: 'rgba(67, 70, 66, 0.8)'
    },
    modalView: {
        backgroundColor: 'rgba(20, 23, 19, 0.9)',
        shadowColor: 'rgba(0, 0, 0, 0.8)',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: heightScale(20),
        elevation: heightScale(20),
        shadowOpacity: 1,
        borderColor: '#727471',
        flex: 1,
        width: windowWidth * 0.8,
        maxHeight: windowHeight * 0.8,
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: heightScale(16),
        paddingHorizontal: heightScale(150),
        paddingTop: heightScale(45),
        paddingBottom: heightScale(75)
    },
    closeButtonWrapper: {
        top: heightScale(35),
        right: heightScale(45),
        width: widthScale(48),
        height: heightScale(48),
        overflow: 'hidden',
        position: 'absolute'
    },
    closeIcon: {
        width: heightScale(48),
        height: heightScale(48)
    },
    modalContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    modalTitle: {
        marginBottom: heightScale(70),
        fontSize: heightScale(48),
        letterSpacing: heightScale(-0.5),
        color: '#f3f3f3',
        textAlign: 'center'
    },
    settingView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: heightScale(40)
    },
    settingTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: heightScale(24)
    },
    settingText: {
        fontSize: heightScale(40),
        letterSpacing: heightScale(-0.4),
        fontWeight: '600',
        color: '#fff'
    },
    controlTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: heightScale(9)
    },
    controlText: {
        fontSize: heightScale(28),
        letterSpacing: heightScale(-0.3),
        lineHeight: heightScale(40),
        fontWeight: '500',
        color: '#fff'
    },
    iconImage: {
        width: heightScale(40),
        height: heightScale(40)
    },
    buttonWrap: {
        justifyContent: 'center',
        flexDirection: 'row',
        gap: heightScale(30)
    },
    modalButton: {
        flexDirection: 'row',
        gap: heightScale(10),
        paddingVertical: heightScale(20),
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderStyle: 'solid',
        borderRadius: heightScale(16),
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    primaryButton: {
        backgroundColor: '#109aff'
    },
    buttonText: {
        fontSize: heightScale(40),
        letterSpacing: heightScale(-0.4),
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center'
    }
});
