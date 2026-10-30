import "@/global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title: "meatsapp" }}/>
      <Stack.Screen name="catalogue" options={{title: "Catalogue"}} />
      <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      <Stack.Screen name="cart" options={ {title: "Cart", headerShown:false }} />
      <Stack.Screen name="product/[id]" options={{headerShown: false}}/>
      <Stack.Screen name="checkout" options={{headerShown: false}}/>
    </Stack>
  );
}
 