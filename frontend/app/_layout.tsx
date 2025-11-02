import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import "../global.css";
import { NotesProvider } from "@/context/NotesContext";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <NotesProvider>
      <ThemeProvider value={DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="edit_modal"
            options={{ headerShown: true, presentation: "modal" , title: "Edit Note" }}
          />
        </Stack>
      </ThemeProvider>
    </NotesProvider>
  );
}
