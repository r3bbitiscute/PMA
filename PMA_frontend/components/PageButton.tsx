import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { Colors } from "../theme/GlobalStyle";
import { useState } from "react";

interface Props {
  pageName: String;
  OnPress: () => void;
}

export default function PageButton({ pageName, OnPress }: Props) {
  const [menuFlag, setMenuFlag] = useState(false);

  const ToggleMenuFlag = () => {
    setMenuFlag((menuFlag) => !menuFlag);
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
        {/* A Button that cover the entire page to increase user experience (let user exit the Modal) */}
        <TouchableWithoutFeedback onPress={ToggleMenuFlag}>
          <View style={styles.overlay}>
            <View style={styles.menu}>
              <TouchableOpacity onPress={ToggleMenuFlag}>
                <Text style={styles.menuFont}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={ToggleMenuFlag}>
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
