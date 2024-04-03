// Path: screens/MainScreen.tsx
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
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchGameData } from '../features/game/gameSlice';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const logoWidth = screenWidth * 0.7;
const logoHeight = logoWidth * (376 / 871);
const buttonWidth = logoWidth - 140;

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
        width: logoWidth,
        height: logoHeight,
        marginBottom: screenHeight * 0.05,
    },
    button: {
        width: buttonWidth,
        backgroundColor: 'rgba(20, 23, 19, 0.6)',
        paddingVertical: screenHeight * 0.03,
        borderRadius: 8,
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25,
    },
});
