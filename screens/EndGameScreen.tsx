// Path: screens/MainScreen.tsx
import React from "react";
import { View, Text, Button } from "react-native";
import { ScreenProps } from "../types";

export default function EndGameScreen({ navigation }: ScreenProps) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-bold">EndGame Screen</Text>
      <Button title="Go to Main" onPress={() => navigation.navigate("Main")} />
    </View>
  );
}
