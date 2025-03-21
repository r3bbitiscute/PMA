import { View, StyleSheet, Alert } from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import axios from "axios";

import { Test } from "../testVariable";
import { BackgroundStyle } from "../theme/GlobalStyle";
import CircleButton from "../components/CircleButton";
import PageButton from "../components/PageButton";

interface PageType {
  name: string;
}

/**
 * The index page will consist of all "Pages" that have been stored in the MongoDB server.
 * @returns The index page
 */
export default function index() {
  const router = useRouter();

  const [pages, setPages] = useState<PageType[]>([]);

  // Getting all "Pages" when index is loaded from MongoDB server
  useFocusEffect(
    useCallback(() => {
      SetAllPageButtons();
    }, [])
  );

  const SetAllPageButtons = () => {
    axios
      .get(`http://${Test.ipConfig}:8080/getAllPages`)
      .then((response) => {
        setPages(response.data);
      })
      .catch((error) => {
        Alert.alert("Error@index.tsx.SetAllPages:", error);
        console.log("Error@index.tsx.SetAllPages:", error);
      });
  };

  return (
    // Looping through each "Pages" retrieved and creating a "Page" button for it
    <View style={BackgroundStyle}>
      {pages.map((page, index) => (
        <PageButton
          key={index}
          pageName={page.name}
          OnPress={() =>
            router.push({
              pathname: `/PageTemplate`,
              params: { pageName: page.name },
            })
          }
          OnDelete={SetAllPageButtons}
        />
      ))}

      {/* Create "Page" Button*/}
      <View style={styles.buttonContainer}>
        <CircleButton
          buttonSize={55}
          icon="add"
          OnPress={() => router.push("/CreateAndEditPage")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
