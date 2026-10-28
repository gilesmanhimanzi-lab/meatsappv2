import { useCartStore } from "@/store/cart";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
export default function CartScreen() {
    const items = useCartStore((state) => state.items);
    const increaseQuantity = useCartStore((state) => state.increaseQuantity);
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
    const removeItem = useCartStore((state) => state.removeItem);
    const getSubTotal = useCartStore((state) => state.getSubTotal);

    const subTotal = getSubTotal();

    return (
        <View className="flex-1 bg-stone-50">
            <View className="px-5 pb-4 pt-3">
                <Text className="text-2xl font-extrabold text-stone-900 mt-5">
                    Review your products before checkout
                </Text>
            </View>

            {items.length === 0 ? (
                <View className="flex-1 items-center justify-center px-8">
                    <View className="h-24 w-24 items-center justify-center rounded-full bg-red-50">
                        <Ionicons
                            name="cart-outline"
                            size={46}
                            color="#991B1B"
                        />
                    </View>

                    <Text className="mt-6 texl-xl font-extrabold">
                        Your cart is empty
                    </Text>

                    <Text className="mt-2 text-center leading-6 text-stone-500">
                        Add your favourites cuts
                    </Text>

                    <TouchableOpacity
                        onPress={() => router.replace("/catalogue")}
                        className="mt-6 rounded-xl bg-red-800 px-6 py-4"
                    >
                        <Text className="font-bold text-white">
                            Browse Catalogue
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <ScrollView
                        className="flex-1"
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20}}
                    >
                        {items.map(({ product, quantity}) => (
                            <View
                                key={product.id}
                                className="mb-4 flex-row rounded-2xl border border-stone-100 bg-white p-3"
                            >
                                <Image
                                    source={{ uri: product.image }}
                                    className="h-28 w-24 rounded-xl bg-stone-100"
                                    resizeMode="cover"
                                />

                                <View className="ml-3 flex-1 justify-between py-1">
                                    <View>
                                        <Text className="text-base font-bold text-stone-900">
                                            {product.name}
                                        </Text>

                                        <Text className="mt-1 text-xs text-stone-500">
                                            ${product.price.toFixed(2)} / {product.unit}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </>
            )}
        </View>
    )

}