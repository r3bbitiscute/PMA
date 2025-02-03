import { Stack } from "expo-router";
import { Colors } from "../theme/GlobalStyle";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.backgroundSecondary },
        headerTintColor: Colors.textPrimary,
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Home", headerLeft: () => null }}
      />
      <Stack.Screen name="CreatePage" options={{ title: "Create Page" }} />
      <Stack.Screen name="CreateCard" options={{ title: "Create Card" }} />
    </Stack>
  );
}
