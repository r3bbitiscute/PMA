import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { BackgroundStyle } from "../theme/GlobalStyle";
import Form from "../components/Form";

/**
 * Allow the user to create and edit "Card" in "List"
 * @returns The create and edit "Card" form
 */
export default function CreateCard() {
  const { pageName, listName, cardName, edit } = useLocalSearchParams();
  const isEditMode = edit === "true";

  return (
    <View style={BackgroundStyle}>
      {/* Form component for creating a new card */}
      <Form
        collection="cards"
        pageName={pageName as string}
        listName={listName as string}
        cardName={cardName as string}
        edit={isEditMode}
      />
    </View>
  );
}
