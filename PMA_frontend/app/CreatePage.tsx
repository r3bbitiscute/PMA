import { View, StyleSheet } from "react-native";

import { BackgroundStyle } from "../theme/GlobalStyle";
import Form from "../components/Form";

/**
 * Allow user to create a new "Page"
 * @returns The create "Page" form
 */
export default function CreatePage() {
  return (
    <View style={BackgroundStyle}>
      <Form collection="pages" />
    </View>
  );
}
