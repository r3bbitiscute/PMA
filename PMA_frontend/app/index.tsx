import { View, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";

import { BackgroundStyle } from "../theme/GlobalStyle";
import { GetAllPages } from "../services";
import CircleButton from "../components/CircleButton";

export default function index() {
  const router = useRouter();

  useEffect(() => {
    GetAllPages();
  }, []);

  return (
    <View style={BackgroundStyle}>
      <View style={styles.buttonContainer}>
        <CircleButton
          buttonSize={55}
          icon="add"
          OnPress={() => {
            router.push("/CreatePage");
          }}
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
