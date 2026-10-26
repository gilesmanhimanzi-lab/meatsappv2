import { Link, Stack } from "expo-router";
import { View } from "react-native";

export default function notFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: "Hooooo shamwari! Not Found"}} />
            <View>
                <Link href={"/"}>
                    Go back home
                </Link>
            </View>
        </>
        
    )
}