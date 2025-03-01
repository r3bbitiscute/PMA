import { View } from "react-native";

import { BackgroundStyle } from "../theme/GlobalStyle";
import Form from "../components/Form";

export default function EditPage() {
  return (
    <View style={BackgroundStyle}>
      <Form collection="pages" edit={true} />
    </View>
  );
}
