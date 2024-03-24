// Path: screens/MainScreen.tsx
import React from "react";
import {Image, Text, StyleSheet, TouchableOpacity, Dimensions} from "react-native";
import {ScreenProps} from "../types";
import {LinearGradient} from 'expo-linear-gradient';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

export default function MainScreen({navigation}: ScreenProps) {
    return (
        <LinearGradient style={styles.container} colors={['#35AAFF', '#FFF3B2']}>
            <Image style={styles.images} source={require('../assets/images/main-logo.png')}/>
            <TouchableOpacity style={styles.button}
                              onPress={() => navigation.navigate("GameSelect")}>
                <Text style={styles.buttonText}>눌러서 시작하기</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    images: {
        // width: screenWidth * 0.7,
        // height: screenHeight * 0.45,
        width: 871,
        height: 376,
        // marginBottom: screenHeight * 0.05,
        marginBottom: 45,
    },
    button: {
        // width: (screenWidth * 0.7 - 140),
        width: 733,
        backgroundColor: "rgba(20, 23, 19, 0.6)",
        paddingVertical: screenHeight * 0.03,
        borderRadius: 8,
    },
    buttonText: {
        color: "#ffffff",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 25,
    },
})