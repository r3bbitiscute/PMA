import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
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
  const [menuFlag, setMenuFlag] = useState(false);

  // Toggle edit and delete menu visibility
  const ToggleMenuFlag = () => {
    setMenuFlag((menuFlag) => !menuFlag);
  };

  const SetPageData = () => {
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
        Alert.alert("Error@List.tsx.SetPageData:", error);
        console.log("Error@List.tsx.SetPageData:", error);
      });
  };

  // Delete card from the MongoDB server
  const DeleteCard = (card: string) => {
    axios
      .delete(`http://${Test.ipConfig}:8080/deleteCard/${page}/${list}/${card}`)
      .then((response) => {
        Alert.alert(response.data);
        {
          /* Refresh the page data */
        }
        SetPageData();
      })
      .catch((error) => {
        Alert.alert(error);
        console.error("Error@List.tsx.DeleteCard: ", error);
      });

    // Closed the menu after deleting the data
    ToggleMenuFlag();
  };

  useFocusEffect(
    useCallback(() => {
      SetPageData();
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
            <View key={index}>
              <TouchableOpacity onLongPress={ToggleMenuFlag}>
                <View style={styles.cardsContainer}>
                  <Text style={[styles.text, { fontWeight: "bold" }]}>
                    {cards.name}
                  </Text>
                  {
                    // Check if the date is not empty then create a new Text and display it
                    !isNaN(cards.date.getTime()) && (
                      <Text style={styles.text}>
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

              {/* Overlay Menu */}
              <Modal transparent visible={menuFlag} animationType="fade">
                {/* A Button that covers the entire page to increase user experience (let user exit the Modal) */}
                <TouchableWithoutFeedback onPress={ToggleMenuFlag}>
                  <View style={styles.overlay}>
                    <View style={styles.menu}>
                      <TouchableOpacity onPress={ToggleMenuFlag}>
                        <Text style={styles.menuFont}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => DeleteCard(cards.name)}>
                        <Text style={styles.menuFont}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
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

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  menu: {
    width: 150,
    backgroundColor: Colors.accent,
    borderRadius: 5,
    padding: 10,
  },

  menuFont: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: "bold",
    padding: 10,
  },
});
