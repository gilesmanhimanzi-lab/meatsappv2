import { Alert, ScrollView, Text, View } from "react-native";

import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { useCartStore } from "@/store/cart";
import { router } from "expo-router";
import { products } from "../constants/products";
import { Category } from "../types/product";

const categories: Category[] = [
    "All",
    "Beef",
    "Chicken",
    "Goat",
    "Pork"
] as const;

export default function CataloguePage() {
    const addItem = useCartStore((state) => state.addItem);
    return (
        <View className="flex-1 bg-stone-50">
            <Header />
            <View className="px-5 pb-3 pt-4">
                <Text className="text-2xl font-extrabold text-stone-900">
                    Get your fill
                </Text>
                <Text className="mt-2 text-sm text-stone-500">
                    get your fill
                </Text>
            </View>

            <ScrollView 
                showsVerticalScrollIndicator={false}
            >
                <View className="flex-row flex-wrap justify-between">
                    {products.map((product) => (
                        <View key={product.id} className="w-[48%]">
                            <ProductCard
                                product={product}
                                onPress={() => {
                                    router.push(`/product/${product.id}`)
                                }
                                }
                                onAdd={() => {
                                    addItem(product, 1);

                                    Alert.alert(
                                    "Item has been added",
                                    `${product.name} has been added to your cart`);
                                }}
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

