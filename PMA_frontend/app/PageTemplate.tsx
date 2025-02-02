import { ScrollView, StyleSheet } from "react-native";
import List from "../components/List";
import { Colors } from "../theme/GlobalStyle";

export default function PageTemplate() {
  return (
    <ScrollView style={styles.background} horizontal={true}>
      <List title="Something"></List>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
