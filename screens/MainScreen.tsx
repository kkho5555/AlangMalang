import React from 'react';
import {
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenNavigationProp, ScreenProps } from '../types';
import { useAppDispatch } from '../app/hooks';
import { fetchGameData } from '../features/game/gameSlice';
import { widthScale, heightScale, moderateScale } from '../utils/Scaling';

export default function MainScreen({ navigation }: ScreenProps) {
    const dispatch = useAppDispatch();
    dispatch(fetchGameData());
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
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('GameSelect')}
            >
                <Text style={styles.buttonText}>눌러서 시작하기</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}
const CardItem = ({
                      title,
                      subtitle,
                      navigation,
                  }: {
    title: string;
    subtitle: string;
    navigation: ScreenNavigationProp;
}) => {
    return (
        <TouchableOpacity
            className="bg-white m-2 p-4 rounded-lg flex-1 max-w-sm"
            onPress={() => navigation.navigate('InGame')}
        >
            <Text className="text-xl font-bold mt-2">{title}</Text>
            <Text className="text-sm text-gray-600">{subtitle}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    images: {
        width: widthScale(871),
        height: heightScale(376),
        marginBottom: heightScale(116),
    },
    button: {
        width: widthScale(855),
        backgroundColor: 'rgba(20, 23, 19, 0.6)',
        paddingVertical: heightScale(20),
        borderRadius: 8,
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: moderateScale(25),
    },
});
