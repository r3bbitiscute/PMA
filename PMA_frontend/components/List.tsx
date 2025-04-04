import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { Test } from "../testVariable";
import { Colors } from "../theme/GlobalStyle";

interface Props {
  title: string;
  page: string;
  list: string;
  screenWidth: number;
  RefreshList: () => void;
}

interface Cards {
  name: string;
  date: Date;
  page: string;
  list: string;
}

export default function List({
  title,
  page,
  list,
  screenWidth,
  RefreshList,
}: Props) {
  const router = useRouter();

  const [cards, setCards] = useState<Cards[]>([]);

  // Getting "Cards" from MongoDB server and set the data
  const SettingCards = () => {
    axios
      .get(`http://${Test.ipConfig}:8080/getAllCards/${page}`)
      .then((result) => {
        const data = result.data.map((card: any) => ({
          ...card,
          date: new Date(card.date),
        }));
        setCards(data);
      })
      .catch((error) => {
        Alert.alert("Error@List.tsx.SetPageData:", error);
        console.log("Error@List.tsx.SetPageData:", error);
      });
  };

  // Delete "List" from the MongoDB server
  const DeleteList = () => {
    axios
      .delete(`http://${Test.ipConfig}:8080/deleteList/${page}/${list}`)
      .then((response) => {
        Alert.alert(response.data);
        // Refresh the "List" data
        RefreshList();
      })
      .catch((error) => {
        Alert.alert(error);
        console.error("Error@List.tsx.DeleteList: ", error);
      });
  };

  useFocusEffect(
    useCallback(() => {
      SettingCards();
    }, [])
  );

  return (
    <View style={[styles.background, { width: screenWidth }]}>
      <View style={styles.listHeader}>
        <Text
          style={[
            styles.defaultFont,
            { fontSize: 22, fontWeight: "bold", padding: 0 },
          ]}
        >
          {title}
        </Text>
        <View style={styles.listHeaderIcons}>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/CreateAndEditList",
                params: {
                  pageName: page,
                  listName: list,
                  edit: "true",
                },
              })
            }
          >
            <MaterialIcons
              name="edit"
              size={25}
              color={Colors.textPrimary}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={DeleteList}>
            <MaterialIcons name="delete" size={25} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>
      {cards.map(
        (cards, index) =>
          cards.list == list && (
            <View key={index}>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/CreateAndEditCard",
                    params: {
                      pageName: page,
                      listName: list,
                      cardName: cards.name,
                      edit: "true",
                    },
                  })
                }
              >
                <View style={styles.cardsContainer}>
                  <Text style={[styles.defaultFont, { fontWeight: "bold" }]}>
                    {cards.name}
                  </Text>
                  {
                    // Check if the date is not empty then create a new Text and display it
                    !isNaN(cards.date.getTime()) && (
                      <Text style={styles.defaultFont}>
                        Due Date:{" "}
                        {cards.date.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </Text>
                    )
                  }
                </View>
              </TouchableOpacity>
            </View>
          )
      )}
      <TouchableOpacity
        onPress={() =>
          router.push({
            pathname: `/CreateAndEditCard`,
            params: { pageName: page, listName: list },
          })
        }
      >
        <Text style={styles.defaultFont}>+ Add Card</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.backgroundSecondary,
  },

  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },

  listHeaderIcons: {
    flexDirection: "row",
  },

  cardsContainer: {
    backgroundColor: Colors.accent,
    borderRadius: 5,
    margin: 10,
  },

  defaultFont: {
    color: Colors.textPrimary,
    fontSize: 15,
    padding: 10,
  },
});
