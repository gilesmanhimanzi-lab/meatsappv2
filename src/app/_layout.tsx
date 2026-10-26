import "@/global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title: "meatsapp" }}/>
      <Stack.Screen name="catalogue" options={{title: "Catalogue"}} />
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
    </Stack>
  );
}
