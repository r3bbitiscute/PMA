import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { BackgroundStyle } from "../theme/GlobalStyle";
import Form from "../components/Form";

/**
 * Allow user to create or edit a "List" in "Page"
 * @returns The create "List" form
 */
export default function CreateAndEditPage() {
  const { pageName, listName, edit } = useLocalSearchParams();
  const isEditMode = edit === "true";

  return (
    <View style={BackgroundStyle}>
      <Form
        collection="lists"
        edit={isEditMode}
        pageName={pageName as string}
      />
    </View>
  );
}
