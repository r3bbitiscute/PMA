import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { BackgroundStyle } from "../theme/GlobalStyle";
import Form from "../components/Form";

/**
 * Allow user to create or edit a "Page"
 * @returns The create "Page" form
 */
export default function CreatePage() {
  const { pageName, edit } = useLocalSearchParams();
  const isEditMode = edit === "true";

  return (
    <View style={BackgroundStyle}>
      <Form
        collection="pages"
        edit={isEditMode}
        pageName={pageName as string}
      />
    </View>
  );
}
