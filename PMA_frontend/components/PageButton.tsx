import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../theme/GlobalStyle";

interface Props {
  pageName: String;
  OnPress: () => void;
}

export default function PageButton({ pageName, OnPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={OnPress}>
      <Text style={styles.label}>{pageName}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.accent,
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
  },

  label: {
    color: Colors.textPrimary,
    fontSize: 25,
  },
});
