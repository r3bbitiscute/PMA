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

import { Test } from "../testVariable";
import { Colors } from "../theme/GlobalStyle";

interface Props {
  pageName: String;
  OnPress: () => void;
  OnDelete: () => void;
}

export default function PageButton({ pageName, OnPress, OnDelete }: Props) {
  const [menuFlag, setMenuFlag] = useState(false);

  // Toggle edit and delete menu visibility
  const ToggleMenuFlag = () => {
    setMenuFlag((menuFlag) => !menuFlag);
  };

  // Delete data from the MongoDB server
  const DeleteData = () => {
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
    ToggleMenuFlag;
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={OnPress}
        onLongPress={ToggleMenuFlag}
      >
        <Text style={styles.label}>{pageName}</Text>
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
              <TouchableOpacity onPress={DeleteData}>
                <Text style={styles.menuFont}>Delete</Text>
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

  label: {
    color: Colors.textPrimary,
    fontSize: 25,
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
