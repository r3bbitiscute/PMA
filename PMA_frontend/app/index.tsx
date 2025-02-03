import { View, StyleSheet, Alert } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import axios from "axios";

import { Test } from "../testVariable";
import { BackgroundStyle } from "../theme/GlobalStyle";
import CircleButton from "../components/CircleButton";
import PageButton from "../components/PageButton";

interface PageType {
  name: string;
}

export default function index() {
  const router = useRouter();

  const [pages, setPages] = useState<PageType[]>([]);

  useFocusEffect(
    useCallback(() => {
      SetAllPages();
    }, [])
  );

  async function SetAllPages() {
    await axios
      .get(`http://${Test.ipConfig}:8080/getAllPages`)
      .then((response) => {
        setPages(response.data);
      })
      .catch((error) => {
        Alert.alert("Error@index.tsx.SetAllPages:", error);
        console.log("Error@index.tsx.SetAllPages:", error);
      });
  }

  return (
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
        />
      ))}

      <View style={styles.buttonContainer}>
        <CircleButton
          buttonSize={55}
          icon="add"
          OnPress={() => router.push("/CreatePage")}
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
