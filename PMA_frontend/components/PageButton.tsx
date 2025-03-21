import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "expo-router";

import { Test } from "../testVariable";
import { Colors } from "../theme/GlobalStyle";

interface Props {
  pageName: string;
  OnPress: () => void;
  OnDelete: () => void;
}

export default function PageButton({ pageName, OnPress, OnDelete }: Props) {
  const router = useRouter();
  const [menuFlag, setMenuFlag] = useState(false);

  // Toggle edit and delete menu visibility
  const ToggleMenuFlag = () => {
    setMenuFlag((menuFlag) => !menuFlag);
  };

  // Delete "Page" from the MongoDB server
  const DeletePage = () => {
    axios
      .delete(`http://${Test.ipConfig}:8080/deletePage/${pageName}`)
      .then((response) => {
        Alert.alert(response.data);
        OnDelete();
      })
      .catch((error) => {
        Alert.alert(error);
        console.error("error@Form.tsx.DeleteData: ", error);
      });

    // Closed the menu after deleting the data
    ToggleMenuFlag();
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={OnPress}
        onLongPress={ToggleMenuFlag}
      >
        <Text style={styles.defaultFont}>{pageName}</Text>
      </TouchableOpacity>

      {/* Overlay Menu */}
      <Modal transparent visible={menuFlag} animationType="fade">
        {/* A Button that covers the entire page to increase user experience (let user exit the Modal) */}
        <TouchableWithoutFeedback onPress={ToggleMenuFlag}>
          <View style={styles.overlayBackground}>
            <View style={styles.overlayMenu}>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: `/CreateAndEditPage`,
                    params: { pageName: pageName, edit: "true" },
                  })
                }
              >
                <Text style={styles.overlayMenuFont}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={DeletePage}>
                <Text style={styles.overlayMenuFont}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.accent,
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
  },

  defaultFont: {
    color: Colors.textPrimary,
    fontSize: 25,
  },

  overlayBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  overlayMenu: {
    width: 150,
    backgroundColor: Colors.accent,
    borderRadius: 5,
    padding: 10,
  },

  overlayMenuFont: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: "bold",
    padding: 10,
  },
});
