import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../theme/GlobalStyle";

interface Props {
  buttonSize: number;
  icon: keyof typeof MaterialIcons.glyphMap;
  OnPress: () => void;
}

/**
 * This function is a component that will create a circle button that will have a Material Icons at the center of it
 *
 * @param buttonSize The size of the button
 * @param icon What icon should be at the center of the button
 * @param OnPress What function should the button performed after button pressed
 * @returns A Circle button that have a icon from Material Icons at the center of it
 */
export default function CircleButton({ buttonSize, icon, OnPress }: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { width: buttonSize, height: buttonSize, borderRadius: buttonSize / 2 },
      ]}
      onPress={OnPress}
    >
      <MaterialIcons
        name={icon}
        size={(buttonSize * 2) / 3}
        color={Colors.textPrimary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
});
