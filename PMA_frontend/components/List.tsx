import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";

import { Test } from "../testVariable";
import { Colors } from "../theme/GlobalStyle";

interface Props {
  title: string;
  page: string;
  list: string;
  screenWidth: number;
}

interface Cards {
  name: string;
  date: Date;
  page: string;
  list: string;
}

export default function List({ title, page, list, screenWidth }: Props) {
  const router = useRouter();

  const [cards, setCards] = useState<Cards[]>([]);

  useFocusEffect(
    useCallback(() => {
      axios
        .get(`http://${Test.ipConfig}:8080/getCards/${page}`)
        .then((result) => {
          const data = result.data.map((card: any) => ({
            ...card,
            date: new Date(card.date),
          }));
          setCards(data);
        })
        .catch((error) => {
          Alert.alert("Error@List.tsx.useFocusEffect:", error);
          console.log("Error@List.tsx.useFocusEffect:", error);
        });
    }, [])
  );

  return (
    <View style={[styles.background, { width: screenWidth }]}>
      <Text style={[styles.text, { fontSize: 22, fontWeight: "bold" }]}>
        {title}
      </Text>
      {cards.map(
        (cards, index) =>
          cards.list == list && (
            <View key={index} style={styles.cardsContainer}>
              <Text style={[styles.text, { fontWeight: "bold" }]}>
                {cards.name}
              </Text>
              {!isNaN(cards.date.getTime()) && (
                <Text style={styles.text}>
                  Due Date:{" "}
                  {cards.date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              )}
            </View>
          )
      )}
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

  cardsContainer: {
    backgroundColor: Colors.accent,
    borderRadius: 5,
    margin: 10,
  },

  text: {
    color: Colors.textPrimary,
    fontSize: 15,
    padding: 10,
  },
});
