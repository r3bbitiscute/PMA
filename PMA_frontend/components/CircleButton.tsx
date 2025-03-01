import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../theme/GlobalStyle";

/**
 * Props for the Circle Button component.
 * @property {number} buttonSize - The size of the button.
 * @property {keyof typeof MaterialIcons.glyphMap} icon - The icon to be displayed in the button.
 * @property {function} OnPress - The function to be called when the button is pressed.
 */
interface Props {
  buttonSize: number;
  icon: keyof typeof MaterialIcons.glyphMap;
  OnPress: () => void;
}

/**
 * CircleButton component creates a circular button with a Material Icon at its center.
 *
 * @param {number} buttonSize - The size of the button.
 * @param {keyof typeof MaterialIcons.glyphMap} icon - The icon to be displayed in the button.
 * @param {function} OnPress - The function to be called when the button is pressed.
 * @returns {JSX.Element} A circular button with a Material Icon at its center.
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
