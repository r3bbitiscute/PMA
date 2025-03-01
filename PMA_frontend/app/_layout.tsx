import { Stack } from "expo-router";
import { Colors } from "../theme/GlobalStyle";

export default function RootLayout() {
  return (
    // Configuring the stack navigator with custom header styles
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.backgroundSecondary },
        headerTintColor: Colors.textPrimary,
      }}
    >
      {/* Home screen configuration */}
      <Stack.Screen
        name="index"
        options={{ title: "Home", headerLeft: () => null }}
      />
      {/* Create Page screen configuration */}
      <Stack.Screen name="CreatePage" options={{ title: "Create Page" }} />
      {/* Create List screen configuration */}
      <Stack.Screen name="CreateList" options={{ title: "Create List" }} />
      {/* Create Card screen configuration */}
      <Stack.Screen name="CreateCard" options={{ title: "Create Card" }} />
    </Stack>
  );
}
