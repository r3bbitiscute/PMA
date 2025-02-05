import { Alert, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { BackgroundStyle } from "../theme/GlobalStyle";
import Form from "../components/Form";

export default function CreateCard() {
  const { pageName, listName } = useLocalSearchParams();

  return (
    <View style={BackgroundStyle}>
      <Form
        collection="cards"
        pageName={pageName as string}
        listName={listName as string}
      />
    </View>
  );
}
