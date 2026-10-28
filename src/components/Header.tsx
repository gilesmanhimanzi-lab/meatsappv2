import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type HeaderProps = {
    showBack?: boolean;
};

export default function Header({ showBack = false }: HeaderProps) {
    return (
        <View className="flex-row items-center justify-between bg-white px-5 py-4">
            <View className="flex-row items-center">
                {showBack ? (
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="mr-3"
                    >
                        <Ionicons name="arrow-back" size={24} color="#292524" ></Ionicons>
                    </TouchableOpacity>
                ) : (
                    <View className="mr-3 h-11 w-11 items-center justify-center rounded-xl bg-red-100">
                        <Ionicons name="restaurant" size={24} color="#991B1B" />
                    </View>
                )}

                <View>
                    <Text className="text-lg font-extrabold text-stone-900">
                        Hukama igasva
                    </Text>
                    <Text className="text-xs text-stone-500">
                        Hukama igasva
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => {
                    router.push("/cart");
                }}
                className="h-11 w-11 items-center justify-center rounded-full bg-stone-10"
            >
                <Ionicons name="cart-outline" size={23} color="#292524" />
            </TouchableOpacity>
        </View>
    )
}