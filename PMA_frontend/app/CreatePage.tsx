import { View, StyleSheet } from "react-native";

import { BackgroundStyle } from "../theme/GlobalStyle";
import Form from "../components/Form";

export default function CreatePage() {
  return (
    <View style={BackgroundStyle}>
      <Form collection="pages" />
    </View>
  );
}
