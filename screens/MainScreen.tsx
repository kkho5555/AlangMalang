// Path: screens/MainScreen.tsx
import React from "react";
import { View, Text, Button } from "react-native";
import { ScreenProps } from "../types";

export default function MainScreen({ navigation }: ScreenProps) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-4xl">알랑말랑 : 예능게임모음.zip</Text>
      <Text className="text-xl">by Team. Exithere</Text>
      <Button
        title="Go to GameSettings"
        onPress={() => navigation.navigate("GameSettings")}
      />
    </View>
  );
}
