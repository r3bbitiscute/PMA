import { View, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
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

  useEffect(() => {
    SetAllPages();
  }, []);

  async function SetAllPages() {
    await axios
      .get(`http://${Test.ipConfig}:8080/getAllPages`)
      .then((response) => {
        setPages(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        Alert.alert("Error@index.ts.GetAllPages:", error);
        console.log("Error@index.ts.GetAllPages: ", error);
      });
  }

  return (
    <View style={BackgroundStyle}>
      <PageButton
        pageName={"Something"}
        OnPress={() => router.push(`/PageTemplate`)}
      />

      {pages.map((page, index) => (
        <PageButton
          key={index}
          pageName={page.name}
          OnPress={() => router.push(`/PageTemplate`)}
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
