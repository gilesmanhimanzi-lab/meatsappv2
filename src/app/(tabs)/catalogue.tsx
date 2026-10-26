import Button from "@/components/Button";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: "#345ffe",
        justifyContent: "center",
        
    },
    footerContainer: {
        flex: 1 / 3,
        justifyContent: "flex-end",
    }
})

export default function CataloguePage() {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text>What are you having today?</Text>
            </View>
            <View style={styles.footerContainer}>
                <Button label="Place Order" onPress={() => alert("Order placed")} />
            </View>
        </SafeAreaView>
    )
}

