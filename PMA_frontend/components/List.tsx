import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { Colors } from "../theme/GlobalStyle";
import { useRouter } from "expo-router";
import { useEffect } from "react";

import { Test } from "../testVariable";

interface Props {
  title: string;
  page: string;
  list: string;
  screenWidth: number;
}

export default function List({ title, page, list, screenWidth }: Props) {
  const router = useRouter();

  useEffect(() => {});

  return (
    <View style={[styles.background, { width: screenWidth }]}>
      <Text style={styles.text}>{title}</Text>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: `/CreateCard`,
            params: { pageName: page, listName: list },
          })
        }
      >
        <Text style={styles.text}>+ Add Card</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.backgroundSecondary,
  },

  text: {
    color: Colors.textPrimary,
    fontSize: 17,
    padding: 10,
  },
});
