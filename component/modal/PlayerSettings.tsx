import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    Pressable,
    Dimensions,
    GestureResponderEvent, ScrollView, TextInput, Button
} from 'react-native';
import Text from '../DefaultText';
import { heightScale, widthScale } from '../../utils/Scaling';

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

    const initTeamList = [
        { name: '심연의 그린', editable: true, isUse: true, isEditing: false },
        { name: '우아한 코랄', editable: true, isUse: true, isEditing: false },
        { name: '진중한 블루', editable: true, isUse: false, isEditing: false },
        { name: '청초한 레드', editable: true, isUse: false, isEditing: false },
        { name: '차분한 블랙', editable: true, isUse: false, isEditing: false },
        { name: '정렬의 옐로', editable: true, isUse: false, isEditing: false }
    ];

    const [teamList, setTeamList] = useState([...initTeamList]);

    const addTeam = (index: number) => {
        const updatedTeamList = [...teamList];
        updatedTeamList[index].isUse = true;
        setTeamList(updatedTeamList);
    };

    //FIXME : 중간에서 팀을 삭제하는 상황을 고려해야 하기 때문에 로직 수정 필요
    const removeTeam = (index: number) => {
        const updatedTeamList = [...teamList];
        updatedTeamList[index].isUse = false;
        setTeamList(updatedTeamList);
    };

    const handleTeamNameChange = (text: string, index: number) => {
        const updatedTeamList = [...teamList];
        updatedTeamList[index].name = text;
        setTeamList(updatedTeamList);
    };

    const handlerTeamOnFocus = (index: number) => {
        const updatedTeamList = [...teamList];
        updatedTeamList[index].isEditing = true;
        setTeamList(updatedTeamList);
    };

    const handlerTeamOnBlur = (index: number) => {
        const updatedTeamList = [...teamList];
        updatedTeamList[index].isEditing = false;
        setTeamList(updatedTeamList);
    };

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
                                style={styles.closeIcon}
                                resizeMode="cover"
                                source={require('../../assets/icons/icon-close.png')}
                            />
                        </Pressable>

                        <View style={styles.modalContent}>
                            <View>
                                <Text style={styles.modalTitle}>
                                    팀 설정
                                </Text>
                            </View>

                            <View style={{ flex: 1, overflow: 'hidden' }}>
                                <ScrollView>

                                    {teamList.map((team, index) => {
                                        if (team.isUse) {
                                            return (
                                                <View
                                                    style={[styles.teamBoxWrapper, !team.isUse && styles.nonSelectTeamBoxWrapper, team.isEditing && styles.selectedTeamBoxWrapper]}
                                                    key={index}>
                                                    <TextInput
                                                        style={[styles.teamText, !team.isUse && styles.notSelectedTeamText]}
                                                        value={team.name}
                                                        onChangeText={(text) => handleTeamNameChange(text, index)}
                                                        editable={team.editable}
                                                        onFocus={() => {
                                                            handlerTeamOnFocus(index);
                                                        }}
                                                        onBlur={() => {
                                                            handlerTeamOnBlur(index);
                                                        }}
                                                    />
                                                    {team.isEditing && (
                                                        <Pressable onPress={() => handlerTeamOnBlur(index)}>
                                                            <View style={styles.confirmWrapper}>
                                                                <Text style={styles.confirmText}>작성완료</Text>
                                                                <Image resizeMode="cover"
                                                                       style={styles.iconCheck}
                                                                       source={require('../../assets/icons/icon-check.png')} />
                                                            </View>
                                                        </Pressable>
                                                    )}
                                                    {index > 1 && team.isUse && !team.isEditing && (
                                                        <TouchableOpacity onPress={() => removeTeam(index)}>
                                                            <Image resizeMode="cover"
                                                                   style={styles.iconImages}
                                                                   source={require('../../assets/icons/icon-minus.png')} />
                                                        </TouchableOpacity>
                                                    )}
                                                </View>
                                            );
                                        }
                                    })}

                                    {teamList.map((team, index) => {
                                        if (!team.isUse && index === teamList.filter((team) => team.isUse).length) {
                                            return (
                                                <View
                                                    style={[styles.teamBoxWrapper, styles.nonSelectTeamBoxWrapper]}
                                                    key={index}
                                                >
                                                    <Text
                                                        style={[styles.teamText, styles.notSelectedTeamText]}
                                                    >
                                                        {team.name}
                                                    </Text>
                                                    <TouchableOpacity onPress={() => addTeam(index)}>
                                                        <Image resizeMode="cover"
                                                               style={styles.iconImages}
                                                               source={require('../../assets/icons/icon-plus.png')}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            );
                                        }
                                    })}
                                </ScrollView>
                            </View>
                        </View>

                    </View>
                </View>
            </Pressable>
        </Modal>
    )
        ;
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
        teamBoxWrapper: {
            borderRadius: heightScale(16),
            backgroundColor: '#fff',
            borderStyle: 'solid',
            borderColor: '#d0d1d0',
            borderWidth: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: widthScale(46),
            paddingRight: widthScale(46),
            paddingVertical: heightScale(22),
            flexDirection: 'row',
            marginBottom: heightScale(24)
        },
        selectedTeamBoxWrapper: {
            paddingRight: widthScale(29)
        },
        nonSelectTeamBoxWrapper: {
            backgroundColor: '#2c2f2b',
            borderColor: '#727471'
        },
        teamText: {
            fontSize: heightScale(48),
            letterSpacing: heightScale(-0.5),
            color: '#141713'
        },
        notSelectedTeamText: {
            color: '#5b5d5a'
        },
        confirmWrapper: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: heightScale(8),
            backgroundColor: '#109aff',
            paddingHorizontal: widthScale(24),
            paddingVertical: heightScale(8)
        },
        confirmText: {
            fontSize: heightScale(28),
            letterSpacing: heightScale(-0.3),
            lineHeight: heightScale(40),
            fontWeight: '500',
            color: '#fff'
        },
        iconCheck: {
            width: heightScale(40),
            height: heightScale(40)
        },
        iconImages: {
            width: heightScale(60),
            height: heightScale(60)
        }
    })
;
