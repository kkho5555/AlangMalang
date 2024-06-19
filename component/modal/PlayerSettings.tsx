import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    GestureResponderEvent,
    Image,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { updateTeam } from '../../app/api';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
    createTeam,
    removeTeam,
    setTeams
} from '../../features/game/gameSlice';
import { heightScale, widthScale } from '../../utils/Scaling';
import Text from '../DefaultText';

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
    const teamList = useAppSelector((state) => state.game.teamList);
    const [tmpValue, onChangeTmpValue] = useState('');
    const [tmpTeamList, onChangeTmpTeamList] = useState(teamList);
    const [focusedTeamIndex, setFocusedTeamIndex] = useState(-1);
    const [userId, setUserId] = useState('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchUserId = async () => {
            const tmpUserId = await AsyncStorage.getItem('userId');
            if (tmpUserId) {
                setUserId(tmpUserId);
            }
        };
        fetchUserId();
    }, []);

    const addTeam = async () => {
        if (userId) {
            dispatch(
                createTeam({
                    teamName: '상큼한 에메랄드',
                    userId
                })
            );
        }
    };

    const removeTeamAction = (index: number) => {
        if (userId) {
            dispatch(
                removeTeam({
                    teamId: tmpTeamList[index].id,
                    userId
                })
            );
        }
    };

    const handleTeamNameChange = (text: string, index: number) => {
        onChangeTmpValue(text);
        const updatedTeamList = tmpTeamList.map((team, i) =>
            i === index ? { ...team, name: text } : team
        );
        onChangeTmpTeamList(updatedTeamList);
    };

    const handleUpdateTeam = async (teamId: number, teamName: string) => {
        if (userId) {
            await updateTeam({
                teamId,
                teamName,
                userId
            });
        }
    };

    const handlerBackground = (e: GestureResponderEvent) => {
        if (e.target !== e.currentTarget) {
            return;
        }
        setModalVisible(!modalVisible);
    };

    useEffect(() => {
        onChangeTmpTeamList(teamList);
    }, [teamList, dispatch]);

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
                                <Text style={styles.modalTitle}>팀 설정</Text>
                            </View>

                            <View style={{ flex: 1, overflow: 'hidden' }}>
                                <ScrollView>
                                    {tmpTeamList.map((team, index) => {
                                        return (
                                            <View
                                                style={[
                                                    styles.teamBoxWrapper,
                                                    styles.selectedTeamBoxWrapper
                                                ]}
                                                key={index}
                                            >
                                                <TextInput
                                                    editable
                                                    style={[
                                                        styles.teamText,
                                                        styles.notSelectedTeamText
                                                    ]}
                                                    value={team.name}
                                                    onChangeText={(text) =>
                                                        handleTeamNameChange(
                                                            text,
                                                            index
                                                        )
                                                    }
                                                    onFocus={() =>
                                                        setFocusedTeamIndex(
                                                            index
                                                        )
                                                    }
                                                    onBlur={() =>
                                                        setFocusedTeamIndex(-1)
                                                    }
                                                />

                                                {focusedTeamIndex === index && (
                                                    <TouchableOpacity
                                                        onPress={async () => {
                                                            dispatch(
                                                                setTeams(
                                                                    tmpTeamList
                                                                )
                                                            );
                                                            await handleUpdateTeam(
                                                                team.id,
                                                                team.name
                                                            );
                                                        }}
                                                    >
                                                        <View
                                                            style={
                                                                styles.confirmWrapper
                                                            }
                                                        >
                                                            <Text
                                                                style={
                                                                    styles.confirmText
                                                                }
                                                            >
                                                                작성완료
                                                            </Text>
                                                            <Image
                                                                resizeMode="cover"
                                                                style={
                                                                    styles.iconCheck
                                                                }
                                                                source={require('../../assets/icons/icon-check.png')}
                                                            />
                                                        </View>
                                                    </TouchableOpacity>
                                                )}

                                                <TouchableOpacity
                                                    onPress={() =>
                                                        removeTeamAction(index)
                                                    }
                                                >
                                                    <Image
                                                        resizeMode="cover"
                                                        style={
                                                            styles.iconImages
                                                        }
                                                        source={require('../../assets/icons/icon-minus.png')}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                        );
                                    })}

                                    <View
                                        style={[
                                            styles.teamBoxWrapper,
                                            styles.nonSelectTeamBoxWrapper
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.teamText,
                                                styles.notSelectedTeamText
                                            ]}
                                        >
                                            상큼한 에메랄드
                                        </Text>
                                        <TouchableOpacity onPress={addTeam}>
                                            <Image
                                                resizeMode="cover"
                                                style={styles.iconImages}
                                                source={require('../../assets/icons/icon-plus.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
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
});
