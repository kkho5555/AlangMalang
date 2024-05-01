import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    Pressable,
    Dimensions,
    GestureResponderEvent,
} from 'react-native';
import Text from '../DefaultText';
import { heightScale, moderateScale, widthScale } from '../../utils/Scaling';

interface IScoreResetProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default function ScoreReset({
    modalVisible,
    setModalVisible,
}: IScoreResetProps) {
    const handlerBackground = (e: GestureResponderEvent) => {
        if (e.target !== e.currentTarget) {
            return;
        }
        setModalVisible(!modalVisible);
    };

    const handlerReset = () => {
        console.log('handlerReset');
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
                                style={styles.closeIcon}
                                resizeMode="cover"
                                source={require('../../assets/icons/icon-close.png')}
                            />
                        </Pressable>

                        <View style={styles.modalContent}>
                            <View>
                                <Text style={styles.modalTitle}>
                                    점수 초기화
                                </Text>

                                <Text style={styles.modalContentText}>
                                    모든게임의 기록이 삭제됩니다.
                                </Text>
                                <Text style={styles.modalContentText}>
                                    점수 초기화 하시겠습니까?
                                </Text>
                            </View>

                            <View style={styles.buttonWrap}>
                                <TouchableOpacity
                                    style={[
                                        styles.modalButton,
                                        styles.buttonCancel,
                                    ]}
                                    onPress={() =>
                                        setModalVisible(!modalVisible)
                                    }
                                >
                                    <Text style={styles.buttonText}>취소</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.modalButton,
                                        styles.buttonReset,
                                    ]}
                                    onPress={handlerReset}
                                >
                                    <Text style={styles.buttonText}>
                                        초기화 하기
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
        width: windowWidth * 0.8,
        maxHeight: windowHeight * 0.8,
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
        width: widthScale(48),
        height: heightScale(48),
        overflow: 'hidden',
        position: 'absolute',
    },
    closeIcon: {
        width: heightScale(48),
        height: heightScale(48)
    },
    modalContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    modalTitle: {
        marginBottom: heightScale(85),
        fontSize: heightScale(48),
        letterSpacing: heightScale(-0.5),
        color: '#f3f3f3',
        textAlign: 'center',
    },
    modalContentText: {
        fontSize: heightScale(40),
        letterSpacing: heightScale(-0.4),
        fontWeight: '500',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    buttonWrap: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: heightScale(30),
    },
    modalButton: {
        paddingVertical: heightScale(30),
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderStyle: 'solid',
        borderRadius: heightScale(16),
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonCancel: {
        flex: 1,
        backgroundColor: '#109aff',
    },
    buttonReset: {
        flex: 2,
        backgroundColor: '#727471',
    },
    buttonText: {
        fontSize: heightScale(40),
        letterSpacing: heightScale(-0.4),
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center',
    },
});
