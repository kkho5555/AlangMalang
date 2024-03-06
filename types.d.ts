import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./navigators/MainNavigator";
export type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Main",
  "GameSettings",
  "InGame",
  "EndGame"
>;

export interface ScreenProps {
  navigation: ScreenNavigationProp;
}
