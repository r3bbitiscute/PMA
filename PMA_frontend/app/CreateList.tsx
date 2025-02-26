import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { BackgroundStyle } from "../theme/GlobalStyle";
import Form from "../components/Form";

/**
 * Allow user to create a new "List" in "Page"
 * @returns The create "List" form
 */
export default function CreatePage() {
  const { pageName } = useLocalSearchParams();

  return (
    <View style={BackgroundStyle}>
      <Form collection="lists" pageName={pageName as string} />
    </View>
  );
}
