import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../theme/GlobalStyle";

interface Props {
  buttonSize: number;
  icon: keyof typeof MaterialIcons.glyphMap;
  OnPress: () => void;
}

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
