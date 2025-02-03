import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { Colors } from "../theme/GlobalStyle";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import axios from "axios";

import { Test } from "../testVariable";

interface Props {
  title: string;
  page: string;
  screenWidth: number;
}

export default function List({ title, page, screenWidth }: Props) {
  const router = useRouter();

  useEffect(() => {});

  return (
    <View style={[styles.background, { width: screenWidth }]}>
      <Text style={styles.text}>{title}</Text>
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: `/CreateCard`,
            params: { page },
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
