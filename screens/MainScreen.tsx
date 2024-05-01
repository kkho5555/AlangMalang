import React, { useEffect } from 'react';
import { Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Progress from 'react-native-progress';
import { ScreenNavigationProp, ScreenProps } from '../types';
import { useAppDispatch } from '../app/hooks';
import { fetchGameData } from '../features/game/gameSlice';
import { widthScale, heightScale } from '../utils/Scaling';

export default function MainScreen({ navigation }: ScreenProps) {
    const [loading, setLoading] = React.useState(0);
    const [typoIndex, setTypoIndex] = React.useState(0);
    const typoList = [
        '게임을 불러오고 있습니다',
        '조금만 더 기다려 주세요',
        '혹시 날씨가 궁금하지는 않으세요?',
        "'냥씨알림'이라고 들어봤다냥?",
        '게임이 곧 시작됩니다'
    ];

    const dispatch = useAppDispatch();
    dispatch(fetchGameData());

    useEffect(() => {
        const interval = setInterval(() => {
            if (loading < 1) {
                setTypoIndex(
                    (prevIndex) => (prevIndex + 1) % (typoList.length - 1)
                );
                if (loading > 0.8) {
                    setTypoIndex(typoList.length - 1);
                }
                setLoading((prevLoading) => prevLoading + 0.1);
            } else {
                clearInterval(interval);
                navigation.navigate('GameSelect');
            }
        }, 500);
        return () => clearInterval(interval);
    }, [loading]);

    return (
        <LinearGradient
            style={styles.container}
            colors={['#35AAFF', '#FFF3B2']}
        >
            <Image
                style={styles.images}
                resizeMode="contain"
                source={require('../assets/images/main-logo.png')}
            />
            {/* <TouchableOpacity */}
            {/*    style={styles.button} */}
            {/*    onPress={() => navigation.navigate('GameSelect')} */}
            {/* > */}

            {/*    <Text style={styles.buttonText}>눌러서 시작하기</Text> */}
            {/* </TouchableOpacity> */}
            <Progress.Bar
                animationType={'timing'}
                progress={loading}
                width={heightScale(855)}
                height={15}
                color="#00B9F5"
                borderRadius={999}
                unfilledColor="#FFFFFF"
                borderColor="transparent"
            />
            <Text style={styles.typo}>{typoList[typoIndex]}</Text>
        </LinearGradient>
    );
}
function CardItem({
    title,
    subtitle,
    navigation
}: {
    title: string;
    subtitle: string;
    navigation: ScreenNavigationProp;
}) {
    return (
        <TouchableOpacity
            className="bg-white m-2 p-4 rounded-lg flex-1 max-w-sm"
            onPress={() => navigation.navigate('InGame')}
        >
            <Text className="text-xl font-bold mt-2">{title}</Text>
            <Text className="text-sm text-gray-600">{subtitle}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    images: {
        width: widthScale(871),
        height: heightScale(376),
        marginBottom: heightScale(116)
    },
    typo: {
        marginTop: heightScale(20),
        fontSize: heightScale(20),
        letterSpacing: heightScale(-0.2),
        fontWeight: '600',
        color: '#727471'
    }
});
