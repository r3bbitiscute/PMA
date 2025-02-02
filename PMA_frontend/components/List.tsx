import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "../theme/GlobalStyle";
import { useState } from "react";

interface Props {
  title: string;
}

export default function List({ title }: Props) {
  return (
    <View style={styles.background}>
      <Text style={styles.text}>{title}</Text>
      <TouchableOpacity>
        <Text style={styles.text}>+ Add Card</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: 250,
    maxHeight: "90%",
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 5,
    marginTop: 10,
  },

  text: {
    color: Colors.textPrimary,
    fontSize: 17,
    padding: 10,
  },
});
