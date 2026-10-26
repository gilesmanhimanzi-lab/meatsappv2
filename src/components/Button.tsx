import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    label: string;
    onPress: () => void;
};

export default function Button({label, onPress}: Props) {
    return (
        <View style={styles.button}>
            <Pressable onPress={onPress}>
                <Text>{label}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 200,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#f26",
        borderRadius: 5,
        flexDirection: "row",
    }
})