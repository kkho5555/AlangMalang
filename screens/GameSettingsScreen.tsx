// Path: screens/MainScreen.tsx
import React from "react";
import { View, Text, Button } from "react-native";
import { ScreenProps } from "../types";

export default function GameSettingScreen({ navigation }: ScreenProps) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="font-bold">GameSetting Screen</Text>
      <Button
        title="Go to InGame"
        onPress={() => navigation.navigate("InGame")}
      />
    </View>
  );
}
