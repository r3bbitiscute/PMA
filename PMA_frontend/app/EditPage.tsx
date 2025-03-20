import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { BackgroundStyle } from "../theme/GlobalStyle";
import Form from "../components/Form";

export default function EditPage() {
  const { pageName } = useLocalSearchParams();

  return (
    <View style={BackgroundStyle}>
      <Form collection="pages" edit={true} pageName={pageName as string} />
    </View>
  );
}
